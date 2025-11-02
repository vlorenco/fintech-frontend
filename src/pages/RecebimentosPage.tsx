import { useState } from "react";
import "./RecebimentosPage.css";
import StatCard from "../components/Dashboard/StatCard";
import ItemCard from "../components/ItemCard/ItemCard";
import Modal from "../components/Modal/Modal";

type Recebimento = {
  id: number;
  titulo: string;
  valor: number;
  descricao: string;
  data: string;
  categoria: string;
  status: "pago" | "pendente";
};

export default function RecebimentosPage() {
  const [recebimentos, setRecebimentos] = useState<Recebimento[]>([
    {
      id: 1,
      titulo: "Salário Novembro",
      valor: 5000,
      descricao: "Pagamento mensal",
      data: "01/11/2025",
      categoria: "Salário",
      status: "pago",
    },
    {
      id: 2,
      titulo: "Freelance Design",
      valor: 1500,
      descricao: "Projeto de UI/UX para cliente",
      data: "15/11/2025",
      categoria: "Freelance",
      status: "pendente",
    },
    {
      id: 3,
      titulo: "Dividendos",
      valor: 320.5,
      descricao: "Dividendos de ações",
      data: "20/11/2025",
      categoria: "Investimentos",
      status: "pago",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    titulo: "",
    valor: "",
    descricao: "",
    data: "",
    categoria: "",
    status: "pendente" as "pago" | "pendente",
  });

  const totalRecebido = recebimentos
    .filter((r) => r.status === "pago")
    .reduce((acc, r) => acc + r.valor, 0);

  const totalPendente = recebimentos
    .filter((r) => r.status === "pendente")
    .reduce((acc, r) => acc + r.valor, 0);

  const totalGeral = recebimentos.reduce((acc, r) => acc + r.valor, 0);

  const handleOpenModal = (recebimento?: Recebimento) => {
    if (recebimento) {
      setEditingId(recebimento.id);
      setFormData({
        titulo: recebimento.titulo,
        valor: recebimento.valor.toString(),
        descricao: recebimento.descricao,
        data: recebimento.data,
        categoria: recebimento.categoria,
        status: recebimento.status,
      });
    } else {
      setEditingId(null);
      setFormData({
        titulo: "",
        valor: "",
        descricao: "",
        data: "",
        categoria: "",
        status: "pendente",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!formData.titulo || !formData.valor || !formData.data || !formData.categoria) {
        setErrorMessage("Preencha todos os campos obrigatórios!");
        return;
      }

      if (editingId) {
        setRecebimentos((prev) =>
          prev.map((r) =>
            r.id === editingId
              ? {
                  ...r,
                  titulo: formData.titulo,
                  valor: parseFloat(formData.valor),
                  descricao: formData.descricao,
                  data: formData.data,
                  categoria: formData.categoria,
                  status: formData.status,
                }
              : r
          )
        );
        setSuccessMessage("Recebimento atualizado com sucesso!");
      } else {
        const novoRecebimento: Recebimento = {
          id: Date.now(),
          titulo: formData.titulo,
          valor: parseFloat(formData.valor),
          descricao: formData.descricao,
          data: formData.data,
          categoria: formData.categoria,
          status: formData.status,
        };
        setRecebimentos((prev) => [...prev, novoRecebimento]);
        setSuccessMessage("Recebimento cadastrado com sucesso!");
      }

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      setErrorMessage("Erro ao salvar recebimento. Tente novamente.");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este recebimento?")) {
      setRecebimentos((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <section className="recebimentos-page">
      <div className="page-header-row">
        <div>
          <h1 className="page-title-gradient">Recebimentos</h1>
          <p className="page-subtitle">Acompanhe todas as entradas de dinheiro</p>
        </div>
        <button className="btn-novo" onClick={() => handleOpenModal()}>
          + Novo Recebimento
        </button>
      </div>

      <div className="stat-row">
        <StatCard
          titulo="Total Recebido"
          valor={`R$ ${totalRecebido.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao={`${recebimentos.filter((r) => r.status === "pago").length} recebimentos`}
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
            </svg>
          }
        />

        <StatCard
          titulo="A Receber"
          valor={`R$ ${totalPendente.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao={`${recebimentos.filter((r) => r.status === "pendente").length} pendentes`}
          variacaoCor="neutro"
          iconBg="#fb7185"
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
              <circle cx="10" cy="10" r="8" />
              <line x1="10" y1="6" x2="10" y2="10" />
              <line x1="10" y1="14" x2="10" y2="14" />
            </svg>
          }
        />

        <StatCard
          titulo="Total Geral"
          valor={`R$ ${totalGeral.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao={`${recebimentos.length} recebimentos`}
          variacaoCor="positivo"
          iconBg="#7c3aed"
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
              <line x1="10" y1="3" x2="10" y2="17" />
              <path d="M6 6h5.5a3 3 0 010 6H8" />
            </svg>
          }
        />
      </div>

      <div className="items-grid">
        {recebimentos.length === 0 ? (
          <p className="empty-message">Nenhum recebimento cadastrado ainda.</p>
        ) : (
          recebimentos.map((recebimento) => (
            <ItemCard
              key={recebimento.id}
              titulo={recebimento.titulo}
              valor={`R$ ${recebimento.valor.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`}
              descricao={recebimento.descricao}
              data={recebimento.data}
              categoria={recebimento.categoria}
              status={recebimento.status}
              tipo="recebimento"
              onEdit={() => handleOpenModal(recebimento)}
              onDelete={() => handleDelete(recebimento.id)}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? "Editar Recebimento" : "Novo Recebimento"}
      >
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="modal-form-field">
            <label className="modal-form-label">Título *</label>
            <input
              type="text"
              className="modal-form-input"
              value={formData.titulo}
              onChange={(e) =>
                setFormData({ ...formData, titulo: e.target.value })
              }
              required
              placeholder="Ex: Salário, Freelance..."
            />
          </div>

          <div className="modal-form-row">
            <div className="modal-form-field">
              <label className="modal-form-label">Valor (R$) *</label>
              <input
                type="number"
                step="0.01"
                className="modal-form-input"
                value={formData.valor}
                onChange={(e) =>
                  setFormData({ ...formData, valor: e.target.value })
                }
                required
                placeholder="0,00"
              />
            </div>

            <div className="modal-form-field">
              <label className="modal-form-label">Data *</label>
              <input
                type="text"
                className="modal-form-input"
                value={formData.data}
                onChange={(e) =>
                  setFormData({ ...formData, data: e.target.value })
                }
                required
                placeholder="DD/MM/AAAA"
              />
            </div>
          </div>

          <div className="modal-form-row">
            <div className="modal-form-field">
              <label className="modal-form-label">Categoria *</label>
              <select
                className="modal-form-select"
                value={formData.categoria}
                onChange={(e) =>
                  setFormData({ ...formData, categoria: e.target.value })
                }
                required
              >
                <option value="">Selecione...</option>
                <option value="Salário">Salário</option>
                <option value="Freelance">Freelance</option>
                <option value="Investimentos">Investimentos</option>
                <option value="Vendas">Vendas</option>
                <option value="Outros">Outros</option>
              </select>
            </div>

            <div className="modal-form-field">
              <label className="modal-form-label">Status *</label>
              <select
                className="modal-form-select"
                value={formData.status}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as "pago" | "pendente",
                  })
                }
                required
              >
                <option value="pendente">Pendente</option>
                <option value="pago">Pago</option>
              </select>
            </div>
          </div>

          <div className="modal-form-field">
            <label className="modal-form-label">Descrição</label>
            <textarea
              className="modal-form-textarea"
              value={formData.descricao}
              onChange={(e) =>
                setFormData({ ...formData, descricao: e.target.value })
              }
              placeholder="Detalhes sobre o recebimento..."
            />
          </div>

          {successMessage && (
            <div className="modal-message modal-message-success">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="modal-message modal-message-error">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
                <path d="M8 4v4M8 11h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              {errorMessage}
            </div>
          )}

          <div className="modal-form-actions">
            <button
              type="button"
              className="modal-btn modal-btn-secondary"
              onClick={handleCloseModal}
            >
              Cancelar
            </button>
            <button type="submit" className="modal-btn modal-btn-primary">
              {editingId ? "Salvar Alterações" : "Cadastrar"}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
