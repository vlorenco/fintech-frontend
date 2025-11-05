import { useState, useEffect } from "react";
import "./RecebimentosPage.css";
import StatCard from "../components/Dashboard/StatCard";
import ItemCard from "../components/ItemCard/ItemCard";
import Modal from "../components/Modal/Modal";
import { receitaService, categoriaService } from "../services";
import type { Receita, Categoria, CreateReceitaRequest, UpdateReceitaRequest } from "../types";

type RecebimentoForm = {
  descricao: string;
  valor: string;
  dataMov: string;
  status: 'PAGO' | 'PENDENTE';
};

export default function RecebimentosPage() {
  const [recebimentos, setRecebimentos] = useState<Receita[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<RecebimentoForm>({
    descricao: "",
    valor: "",
    dataMov: "",
    status: "PAGO",
  });

  // Carregar dados ao montar o componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [receitasData, categoriasData] = await Promise.all([
        receitaService.getAll(),
        categoriaService.getAll() // Backend não tem filtro por tipo
      ]);

      setRecebimentos(receitasData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setErrorMessage("Erro ao carregar dados. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  };

  // Calcular totais baseado nos dados reais  
  const totalRecebido = recebimentos.reduce((acc, r) => acc + r.valor, 0);

  const handleOpenModal = (recebimento?: Receita) => {
    if (recebimento) {
      setEditingId(recebimento.idReceita);
      setFormData({
        descricao: recebimento.descricao,
        valor: recebimento.valor.toString(),
        dataMov: recebimento.dataMov.split('T')[0], // Converter para formato de data do input
        status: recebimento.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        descricao: "",
        valor: "",
        dataMov: "",
        status: "PAGO",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoadingForm(true);

    try {
      if (!formData.descricao || !formData.valor || !formData.dataMov) {
        setErrorMessage("Preencha todos os campos obrigatórios!");
        return;
      }

      const receitaData: CreateReceitaRequest | UpdateReceitaRequest = {
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        dataMov: formData.dataMov,
        idCategoria: 1, // Categoria padrão
        status: formData.status,
      };

      if (editingId) {
        // Atualizar receita existente
        await receitaService.update(editingId, receitaData);
        setSuccessMessage("Recebimento atualizado com sucesso!");
      } else {
        // Criar nova receita
        await receitaService.create(receitaData as CreateReceitaRequest);
        setSuccessMessage("Recebimento cadastrado com sucesso!");
      }

      // Recarregar dados
      await loadData();

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar recebimento:", error);
      setErrorMessage("Erro ao salvar recebimento. Tente novamente.");
    } finally {
      setLoadingForm(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este recebimento?")) {
      try {
        await receitaService.delete(id);
        setSuccessMessage("Recebimento excluído com sucesso!");
        await loadData();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Erro ao excluir recebimento:", error);
        setErrorMessage("Erro ao excluir recebimento. Tente novamente.");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <section className="recebimentos-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <p>Carregando recebimentos...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="recebimentos-page">
      <header className="page-header">
        <div className="page-header-content">
          <h1 className="page-title-gradient">Recebimentos</h1>
          <p className="page-subtitle">
            Gerencie suas receitas e acompanhe seus ganhos
          </p>
        </div>
        <button className="add-button" onClick={() => handleOpenModal()}>
          <span className="add-icon">+</span>
          Novo Recebimento
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
          titulo="Total Recebido"
          valor={`R$${totalRecebido.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao={`${recebimentos.length} recebimentos`}
          variacaoCor="positivo"
          iconBg="#10b981"
          icon={
            <svg
              width="20"
              height="20"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12l4 4 10-10" />
              <path d="M19 6v4h-4" />
            </svg>
          }
        />

        <StatCard
          titulo="Média por Item"
          valor={`R$${recebimentos.length > 0 
            ? (totalRecebido / recebimentos.length).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })
            : "0,00"
          }`}
          variacao="Valor médio"
          variacaoCor="neutro"
          iconBg="#06b6d4"
          icon={
            <svg
              width="20"
              height="20"
              stroke="white"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6" />
            </svg>
          }
        />

      </div>

      <div className="recebimentos-grid">
        {recebimentos.map((recebimento) => {
          const categoria = categorias.find(c => c.idCategoria === recebimento.idCategoria);
          return (
            <ItemCard
              key={recebimento.idReceita}
              titulo={recebimento.descricao}
              valor={recebimento.valor.toString()}
              descricao={`Status: ${recebimento.status}`}
              data={formatDate(recebimento.dataMov)}
              categoria={categoria?.nome || 'Sem categoria'}
              tipo="recebimento"
              onEdit={() => handleOpenModal(recebimento)}
              onDelete={() => handleDelete(recebimento.idReceita)}
            />
          );
        })}

        {recebimentos.length === 0 && (
          <div className="empty-state">
            <p>Nenhum recebimento cadastrado ainda.</p>
            <button onClick={() => handleOpenModal()}>
              Cadastrar primeiro recebimento
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title={editingId ? "Editar Recebimento" : "Novo Recebimento"}
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
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                placeholder="Ex: Salário, Freelance, Dividendos..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="valor">Valor *</label>
                <input
                  type="number"
                  id="valor"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) =>
                    setFormData({ ...formData, valor: e.target.value })
                  }
                  placeholder="0,00"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dataMov">Data *</label>
                <input
                  type="date"
                  id="dataMov"
                  value={formData.dataMov}
                  onChange={(e) =>
                    setFormData({ ...formData, dataMov: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value as 'PAGO' | 'PENDENTE' })
                }
                required
              >
                <option value="PAGO">Pago</option>
                <option value="PENDENTE">Pendente</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={handleCloseModal}
                className="cancel-button"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="submit-button"
                disabled={loadingForm}
              >
                {loadingForm 
                  ? "Salvando..." 
                  : editingId 
                  ? "Atualizar" 
                  : "Cadastrar"
                }
              </button>
            </div>
          </form>
        </Modal>
      )}
    </section>
  );
}