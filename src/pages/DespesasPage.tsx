import { useState } from "react";
import "./DespesasPage.css";
import StatCard from "../components/Dashboard/StatCard";
import ItemCard from "../components/ItemCard/ItemCard";
import Modal from "../components/Modal/Modal";

type Despesa = {
  id: number;
  titulo: string;
  valor: number;
  descricao: string;
  data: string;
  categoria: string;
  status: "pago" | "pendente";
};

export default function DespesasPage() {
  const [despesas, setDespesas] = useState<Despesa[]>([
    {
      id: 1,
      titulo: "Aluguel",
      valor: 1200,
      descricao: "Aluguel mensal do apartamento",
      data: "05/11/2025",
      categoria: "Moradia",
      status: "pago",
    },
    {
      id: 2,
      titulo: "Internet",
      valor: 99.9,
      descricao: "Plano de internet 300MB",
      data: "10/11/2025",
      categoria: "Contas",
      status: "pendente",
    },
    {
      id: 3,
      titulo: "Supermercado",
      valor: 450.75,
      descricao: "Compras do mês",
      data: "12/11/2025",
      categoria: "Alimentação",
      status: "pago",
    },
    {
      id: 4,
      titulo: "Academia",
      valor: 89.9,
      descricao: "Mensalidade da academia",
      data: "15/11/2025",
      categoria: "Saúde",
      status: "pendente",
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

  const totalPago = despesas
    .filter((d) => d.status === "pago")
    .reduce((acc, d) => acc + d.valor, 0);

  const totalPendente = despesas
    .filter((d) => d.status === "pendente")
    .reduce((acc, d) => acc + d.valor, 0);

  const totalGeral = despesas.reduce((acc, d) => acc + d.valor, 0);

  const handleOpenModal = (despesa?: Despesa) => {
    if (despesa) {
      setEditingId(despesa.id);
      setFormData({
        titulo: despesa.titulo,
        valor: despesa.valor.toString(),
        descricao: despesa.descricao,
        data: despesa.data,
        categoria: despesa.categoria,
        status: despesa.status,
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
        setDespesas((prev) =>
          prev.map((d) =>
            d.id === editingId
              ? {
                  ...d,
                  titulo: formData.titulo,
                  valor: parseFloat(formData.valor),
                  descricao: formData.descricao,
                  data: formData.data,
                  categoria: formData.categoria,
                  status: formData.status,
                }
              : d
          )
        );
        setSuccessMessage("Despesa atualizada com sucesso!");
      } else {
        const novaDespesa: Despesa = {
          id: Date.now(),
          titulo: formData.titulo,
          valor: parseFloat(formData.valor),
          descricao: formData.descricao,
          data: formData.data,
          categoria: formData.categoria,
          status: formData.status,
        };
        setDespesas((prev) => [...prev, novaDespesa]);
        setSuccessMessage("Despesa cadastrada com sucesso!");
      }

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      setErrorMessage("Erro ao salvar despesa. Tente novamente.");
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta despesa?")) {
      setDespesas((prev) => prev.filter((d) => d.id !== id));
    }
  };

  const handleToggleStatus = (id: number) => {
    setDespesas((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "pago" ? "pendente" : "pago" }
          : d
      )
    );
  };

  return (
    <section className="despesas-page">
      <div className="page-header-row">
        <div>
          <h1 className="page-title-gradient">Despesas</h1>
          <p className="page-subtitle">Controle e reduza seus gastos</p>
        </div>
        <button className="btn-novo" onClick={() => handleOpenModal()}>
          + Nova Despesa
        </button>
      </div>

      <div className="stat-row">
        <StatCard
          titulo="Total Pago"
          valor={`R$ ${totalPago.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao={`${despesas.filter((d) => d.status === "pago").length} despesas pagas`}
          variacaoCor="neutro"
          iconBg="#ef4444"
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
          titulo="A Pagar"
          valor={`R$ ${totalPendente.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
          variacao={`${despesas.filter((d) => d.status === "pendente").length} pendentes`}
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
          variacao={`${despesas.length} despesas`}
          variacaoCor="neutro"
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
        {despesas.length === 0 ? (
          <p className="empty-message">Nenhuma despesa cadastrada ainda.</p>
        ) : (
          despesas.map((despesa) => (
            <ItemCard
              key={despesa.id}
              titulo={despesa.titulo}
              valor={`R$ ${despesa.valor.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}`}
              descricao={despesa.descricao}
              data={despesa.data}
              categoria={despesa.categoria}
              status={despesa.status}
              tipo="despesa"
              onEdit={() => handleOpenModal(despesa)}
              onDelete={() => handleDelete(despesa.id)}
              onToggleStatus={() => handleToggleStatus(despesa.id)}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? "Editar Despesa" : "Nova Despesa"}
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
              placeholder="Ex: Aluguel, Internet..."
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
                <option value="Moradia">Moradia</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Transporte">Transporte</option>
                <option value="Saúde">Saúde</option>
                <option value="Educação">Educação</option>
                <option value="Lazer">Lazer</option>
                <option value="Contas">Contas</option>
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
              placeholder="Detalhes sobre a despesa..."
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
