import { useState, useEffect } from "react";
import "./MetasPage.css";
import StatCard from "../components/Dashboard/StatCard";
import Modal from "../components/Modal/Modal";
import ActionButton from "../components/ActionButton/ActionButton";
import { metaService } from "../services";
import type { Meta, CreateMetaRequest, UpdateMetaRequest, ContribuicaoMetaRequest } from "../types";

type MetaForm = {
  descricao: string;
  valorObjetivo: string;
  dataMeta: string;
};

type ContribuicaoForm = {
  valor: string;
  descricao: string;
};

export default function MetasPage() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContribuicaoModalOpen, setIsContribuicaoModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [contribuicaoMetaId, setContribuicaoMetaId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState<MetaForm>({
    descricao: "",
    valorObjetivo: "",
    dataMeta: "",
  });

  const [contribuicaoData, setContribuicaoData] = useState<ContribuicaoForm>({
    valor: "",
    descricao: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const metasData = await metaService.getAll();
      if (!metasData) {
        setMetas([]);
        return;
      }
      
      if (Array.isArray(metasData) && metasData.length === 0) {
        setMetas([]);
        return;
      }
      
      const metasArray = Array.isArray(metasData) ? metasData : [metasData];
      
      const metasNormalizadas = metasArray
        .filter(meta => meta && typeof meta === 'object')
        .map((meta: any) => {
          if (!meta.idMeta && meta.id) {
            return { ...meta, idMeta: meta.id };
          }
          return meta;
        });
      
      setMetas(metasNormalizadas);
    } catch (error) {
      console.error("Erro ao carregar metas:", error);
      setErrorMessage("Erro ao carregar metas. Verifique se o servidor está rodando.");
      setMetas([]);
    } finally {
      setLoading(false);
    }
  };


  const metasAtivas = metas.filter(m => m.status === "ATIVA");
  const metasPausadas = metas.filter(m => m.status === "PAUSADA");
  const valorTotalObjetivo = metas.reduce((acc, m) => acc + m.valorObjetivo, 0);
  const valorTotalAtual = metas.reduce((acc, m) => acc + m.valorAtual, 0);
  const progressoGeral = valorTotalObjetivo > 0 ? (valorTotalAtual / valorTotalObjetivo) * 100 : 0;

  const handleOpenModal = (meta?: Meta) => {
    if (meta) {
      setEditingId(meta.idMeta);
      setFormData({
        descricao: meta.descricao,
        valorObjetivo: meta.valorObjetivo.toString(),
        dataMeta: meta.dataMeta.split('T')[0],
      });
    } else {
      setEditingId(null);
      setFormData({
        descricao: "",
        valorObjetivo: "",
        dataMeta: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleOpenContribuicaoModal = (metaId: number) => {
    setContribuicaoMetaId(metaId);
    setContribuicaoData({
      valor: "",
      descricao: "",
    });
    setIsContribuicaoModalOpen(true);
  };

  const handleCloseContribuicaoModal = () => {
    setIsContribuicaoModalOpen(false);
    setContribuicaoMetaId(null);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoadingForm(true);

    try {
      if (!formData.descricao || !formData.valorObjetivo || !formData.dataMeta) {
        setErrorMessage("Preencha todos os campos obrigatórios!");
        setLoadingForm(false);
        return;
      }

      const metaData: CreateMetaRequest | UpdateMetaRequest = {
        descricao: formData.descricao,
        valorObjetivo: parseFloat(formData.valorObjetivo),
        dataMeta: formData.dataMeta,
      };

      if (editingId) {
        await metaService.update(editingId, metaData);
        setSuccessMessage("Meta atualizada com sucesso!");
      } else {
        await metaService.create(metaData as CreateMetaRequest);
        setSuccessMessage("Meta cadastrada com sucesso!");
      }
      await loadData();

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar meta:", error);
      setErrorMessage("Erro ao salvar meta. Tente novamente.");
    } finally {
      setLoadingForm(false);
    }
  };

  const handleContribuicaoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoadingForm(true);

    try {
      const valorNum = parseFloat(contribuicaoData.valor);
      
      if (!contribuicaoData.valor || isNaN(valorNum) || valorNum <= 0) {
        setErrorMessage("Preencha um valor válido para a contribuição!");
        setLoadingForm(false);
        return;
      }

      if (!contribuicaoMetaId) {
        setErrorMessage("Meta não selecionada!");
        setLoadingForm(false);
        return;
      }

      const contribuicao: ContribuicaoMetaRequest = {
        valor: valorNum,
        descricao: contribuicaoData.descricao || "Contribuição"
      };

      await metaService.contribuir(contribuicaoMetaId, contribuicao);
      setSuccessMessage("Contribuição adicionada com sucesso!");
      await loadData();

      setTimeout(() => {
        handleCloseContribuicaoModal();
      }, 1500);
    } catch (error) {
      console.error("Erro ao adicionar contribuição:", error);
      setErrorMessage("Erro ao adicionar contribuição. Verifique se a meta está ativa.");
    } finally {
      setLoadingForm(false);
    }
  };

  const handlePausarMeta = async (id: number) => {
    if (!id) {
      setErrorMessage("ID da meta inválido");
      return;
    }
    try {
      await metaService.pausar(id);
      setSuccessMessage("Meta pausada com sucesso!");
      await loadData();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erro ao pausar meta:", error);
      setErrorMessage("Erro ao pausar meta. Verifique se ela está ativa.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleReativarMeta = async (id: number) => {
    try {
      await metaService.reativar(id);
      setSuccessMessage("Meta reativada com sucesso!");
      await loadData();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Erro ao reativar meta:", error);
      setErrorMessage("Erro ao reativar meta. Verifique se ela está pausada.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleDelete = async (id: number) => {
    if (!id) {
      setErrorMessage("ID da meta inválido");
      return;
    }
    if (window.confirm("Tem certeza que deseja excluir esta meta?")) {
      try {
        await metaService.delete(id);
        setSuccessMessage("Meta excluída com sucesso!");
        await loadData();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Erro ao excluir meta:", error);
        setErrorMessage("Erro ao excluir meta. Tente novamente.");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ATIVA': return '#10b981';
      case 'CONCLUIDA': return '#3b82f6';
      case 'PAUSADA': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ATIVA': return 'Ativa';
      case 'CONCLUIDA': return 'Concluída';
      case 'PAUSADA': return 'Pausada';
      case 'CANCELADA': return 'Cancelada';
      default: return status;
    }
  };

  if (loading) {
    return (
      <section className="metas-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <p>Carregando metas...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="metas-page">
      <header className="page-header">
        <div className="page-header-content">
          <h1 className="page-title-gradient">Metas Financeiras</h1>
          <p className="page-subtitle">
            Defina objetivos e acompanhe seu progresso
          </p>
        </div>
        <button className="add-button" onClick={() => handleOpenModal()}>
          <span className="add-icon">+</span>
          Nova Meta
        </button>
      </header>

      {errorMessage && (
        <div className="error-message" style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#fee', color: '#c53030', borderRadius: '8px' }}>
          {errorMessage}
        </div>
      )}

      {successMessage && (
        <div className="success-message" style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f0fff4', color: '#38a169', borderRadius: '8px' }}>
          {successMessage}
        </div>
      )}

      <div className="stats-row">
        <StatCard
          titulo="Metas Ativas"
          valor={metasAtivas.length.toString()}
          variacao={`${metasPausadas.length} pausadas`}
          variacaoCor="positivo"
          iconBg="#10b981"
          icon={
            <svg width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3" />
            </svg>
          }
        />

        <StatCard
          titulo="Progresso Geral"
          valor={`${progressoGeral.toFixed(1)}%`}
          variacao={`${metasPausadas.length} pausadas`}
          variacaoCor="positivo"
          iconBg="#3b82f6"
          icon={
            <svg width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12l2 2 4-4" />
            </svg>
          }
        />

        <StatCard
          titulo="Total Objetivo"
          valor={`R$${valorTotalObjetivo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          variacao="Soma de todas as metas"
          variacaoCor="neutro"
          iconBg="#8b5cf6"
          icon={
            <svg width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          }
        />

        <StatCard
          titulo="Total Alcançado"
          valor={`R$${valorTotalAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`}
          variacao="Valor já conquistado"
          variacaoCor="positivo"
          iconBg="#06b6d4"
          icon={
            <svg width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 7l5 5-5 5M6 17l5-5-5-5" />
            </svg>
          }
        />
      </div>

      <div className="metas-grid">
        {metas.map((meta, index) => {
          const isAtiva = meta.status === "ATIVA";
          const isPausada = meta.status === "PAUSADA";

          return (
            <div key={meta.idMeta || index} className="meta-card">
              <div className="meta-header">
                <h3 className="meta-title">{meta.descricao}</h3>
                <span 
                  className="meta-status" 
                  style={{ 
                    backgroundColor: getStatusColor(meta.status),
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {getStatusText(meta.status)}
                </span>
              </div>

              <div className="meta-progress">
                <div className="progress-header">
                  <span className="progress-text">
                    R${meta.valorAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} de R${meta.valorObjetivo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="progress-percentage">{meta.progresso.toFixed(1)}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${meta.progresso}%`,
                      backgroundColor: isAtiva ? '#3b82f6' : '#6b7280'
                    }}
                  />
                </div>
              </div>

              <div className="meta-info">
                <div className="meta-dates">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Prazo: {formatDate(meta.dataMeta)}</span>
                </div>
              </div>

              <div className="meta-actions">
                {isAtiva && (
                  <ActionButton
                    variant="contribute"
                    onClick={() => handleOpenContribuicaoModal(meta.idMeta)}
                  />
                )}
                
                {isAtiva && (
                  <ActionButton
                    variant="pause"
                    onClick={() => handlePausarMeta(meta.idMeta)}
                  />
                )}
                
                {isPausada && (
                  <ActionButton
                    variant="reactivate"
                    onClick={() => handleReativarMeta(meta.idMeta)}
                  />
                )}

                <ActionButton
                  variant="edit"
                  onClick={() => handleOpenModal(meta)}
                />
                
                <ActionButton
                  variant="delete"
                  onClick={() => handleDelete(meta.idMeta)}
                />
              </div>
            </div>
          );
        })}

        {metas.length === 0 && (
          <div className="empty-state">
            <p>Nenhuma meta cadastrada ainda.</p>
            <button onClick={() => handleOpenModal()}>
              Cadastrar primeira meta
            </button>
          </div>
        )}
      </div>


      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title={editingId ? "Editar Meta" : "Nova Meta"}
          onClose={handleCloseModal}
        >
          <form onSubmit={handleSubmit} className="form">
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            <div className="form-group">
              <label htmlFor="descricao">Descrição *</label>
              <input
                type="text"
                id="descricao"
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Ex: Viagem para Europa, Carro novo..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="valorObjetivo">Valor Objetivo *</label>
                <input
                  type="number"
                  id="valorObjetivo"
                  step="0.01"
                  value={formData.valorObjetivo}
                  onChange={(e) => setFormData({ ...formData, valorObjetivo: e.target.value })}
                  placeholder="0,00"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dataMeta">Data Limite *</label>
                <input
                  type="date"
                  id="dataMeta"
                  value={formData.dataMeta}
                  onChange={(e) => setFormData({ ...formData, dataMeta: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCloseModal} className="cancel-button">
                Cancelar
              </button>
              <button type="submit" className="submit-button" disabled={loadingForm}>
                {loadingForm ? "Salvando..." : editingId ? "Atualizar" : "Cadastrar"}
              </button>
            </div>
          </form>
        </Modal>
      )}


      {isContribuicaoModalOpen && (
        <Modal
          isOpen={isContribuicaoModalOpen}
          title="Adicionar Contribuição"
          onClose={handleCloseContribuicaoModal}
        >
          <form onSubmit={handleContribuicaoSubmit} className="form">
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}

            <div className="form-group">
              <label htmlFor="valorContribuicao">Valor da Contribuição *</label>
              <input
                type="number"
                id="valorContribuicao"
                step="0.01"
                value={contribuicaoData.valor}
                onChange={(e) => setContribuicaoData({ ...contribuicaoData, valor: e.target.value })}
                placeholder="0,00"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="descricaoContribuicao">Descrição</label>
              <input
                type="text"
                id="descricaoContribuicao"
                value={contribuicaoData.descricao}
                onChange={(e) => setContribuicaoData({ ...contribuicaoData, descricao: e.target.value })}
                placeholder="Ex: Depósito mensal, Economia do mês..."
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={handleCloseContribuicaoModal} className="cancel-button">
                Cancelar
              </button>
              <button type="submit" className="submit-button" disabled={loadingForm}>
                {loadingForm ? "Adicionando..." : "Adicionar Contribuição"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}