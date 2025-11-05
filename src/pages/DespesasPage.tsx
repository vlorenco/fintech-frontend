import { useState, useEffect } from "react";
import "./DespesasPage.css";
import StatCard from "../components/Dashboard/StatCard";
import ItemCard from "../components/ItemCard/ItemCard";
import Modal from "../components/Modal/Modal";
import { despesaService, categoriaService } from "../services";
import type { Despesa, Categoria, CreateDespesaRequest, UpdateDespesaRequest } from "../types";

type DespesaForm = {
  descricao: string;
  valor: string;
  dataMov: string;
  idCategoria: string;
  status: 'PAGO' | 'PENDENTE';
};

export default function DespesasPage() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<DespesaForm>({
    descricao: "",
    valor: "",
    dataMov: "",
    idCategoria: "",
    status: "PAGO",
  });

  // Carregar dados ao montar o componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [despesasData, categoriasData] = await Promise.all([
        despesaService.getAll(),
        categoriaService.getAll() // Backend não tem filtro por tipo
      ]);

      setDespesas(despesasData);
      setCategorias(categoriasData);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      setErrorMessage("Erro ao carregar dados. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  };

  // Calcular totais baseado nos dados reais  
  const totalDespesas = despesas.reduce((acc, d) => acc + d.valor, 0);

  const handleOpenModal = (despesa?: Despesa) => {
    if (despesa) {
      setEditingId(despesa.idDespesa);
      setFormData({
        descricao: despesa.descricao,
        valor: despesa.valor.toString(),
        dataMov: despesa.dataMov.split('T')[0], // Converter para formato de data do input
        idCategoria: despesa.idCategoria.toString(),
        status: despesa.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        descricao: "",
        valor: "",
        dataMov: "",
        idCategoria: "",
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
      if (!formData.descricao || !formData.valor || !formData.dataMov || !formData.idCategoria) {
        setErrorMessage("Preencha todos os campos obrigatórios!");
        return;
      }

      const despesaData: CreateDespesaRequest | UpdateDespesaRequest = {
        descricao: formData.descricao,
        valor: parseFloat(formData.valor),
        dataMov: formData.dataMov,
        idCategoria: parseInt(formData.idCategoria),
        status: formData.status,
      };

      if (editingId) {
        // Atualizar despesa existente
        await despesaService.update(editingId, despesaData);
        setSuccessMessage("Despesa atualizada com sucesso!");
      } else {
        // Criar nova despesa
        await despesaService.create(despesaData as CreateDespesaRequest);
        setSuccessMessage("Despesa cadastrada com sucesso!");
      }

      // Recarregar dados
      await loadData();

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar despesa:", error);
      setErrorMessage("Erro ao salvar despesa. Tente novamente.");
    } finally {
      setLoadingForm(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta despesa?")) {
      try {
        await despesaService.delete(id);
        setSuccessMessage("Despesa excluída com sucesso!");
        await loadData();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Erro ao excluir despesa:", error);
        setErrorMessage("Erro ao excluir despesa. Tente novamente.");
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
      <section className="despesas-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <p>Carregando despesas...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="despesas-page">
      <header className="page-header">
        <div className="page-header-content">
          <h1 className="page-title-gradient">Despesas</h1>
          <p className="page-subtitle">
            Controle seus gastos e mantenha suas finanças organizadas
          </p>
        </div>
        <button className="add-button" onClick={() => handleOpenModal()}>
          <span className="add-icon">+</span>
          Nova Despesa
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
          titulo="Total de Despesas"
          valor={`R$${totalDespesas.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao={`${despesas.length} despesas registradas`}
          variacaoCor="negativo"
          iconBg="#ec4899"
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
              <rect x="4" y="4" width="12" height="12" rx="2" />
              <line x1="7" y1="10" x2="13" y2="10" />
              <line x1="10" y1="7" x2="10" y2="13" />
            </svg>
          }
        />

        <StatCard
          titulo="Média por Despesa"
          valor={`R$${despesas.length > 0 
            ? (totalDespesas / despesas.length).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })
            : "0,00"
          }`}
          variacao="Valor médio por item"
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

        <StatCard
          titulo="Maior Despesa"
          valor={`R$${despesas.length > 0 
            ? Math.max(...despesas.map(d => d.valor)).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })
            : "0,00"
          }`}
          variacao="Maior valor registrado"
          variacaoCor="negativo"
          iconBg="#f59e0b"
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
              <path d="M13 7l5 5-5 5M6 17l5-5-5-5" />
            </svg>
          }
        />
      </div>

      <div className="despesas-grid">
        {despesas.map((despesa) => {
          const categoria = categorias.find(c => c.idCategoria === despesa.idCategoria);
          return (
            <ItemCard
              key={despesa.idDespesa}
              titulo={despesa.descricao}
              valor={despesa.valor.toString()}
              descricao={`Status: ${despesa.status}`}
              data={formatDate(despesa.dataMov)}
              categoria={categoria?.nome || 'Sem categoria'}
              tipo="despesa"
              onEdit={() => handleOpenModal(despesa)}
              onDelete={() => handleDelete(despesa.idDespesa)}
            />
          );
        })}

        {despesas.length === 0 && (
          <div className="empty-state">
            <p>Nenhuma despesa cadastrada ainda.</p>
            <button onClick={() => handleOpenModal()}>
              Cadastrar primeira despesa
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title={editingId ? "Editar Despesa" : "Nova Despesa"}
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
                placeholder="Ex: Aluguel, Supermercado, Conta de luz..."
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
              <label htmlFor="categoria">Categoria *</label>
              <select
                id="categoria"
                value={formData.idCategoria}
                onChange={(e) =>
                  setFormData({ ...formData, idCategoria: e.target.value })
                }
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.idCategoria} value={categoria.idCategoria}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
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