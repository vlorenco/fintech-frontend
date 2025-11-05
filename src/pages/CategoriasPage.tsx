import { useState, useEffect } from "react";
import "./CategoriasPage.css";
import StatCard from "../components/Dashboard/StatCard";
import Modal from "../components/Modal/Modal";
import ActionButton from "../components/ActionButton/ActionButton";
import { categoriaService } from "../services";
import type { Categoria, CreateCategoriaRequest, UpdateCategoriaRequest } from "../types";

type CategoriaForm = {
  nome: string;
  cor: string;
};

type CategoriaWithStats = Categoria & {
  quantidadeItens: number;
  valorTotal: number;
};

export default function CategoriasPage() {
  const [categorias, setCategorias] = useState<CategoriaWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingForm, setLoadingForm] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<CategoriaForm>({
    nome: "",
    cor: "#3b82f6",
  });

  // Cores pré-definidas para facilitar a seleção
  const coresPredefinidas = [
    "#3b82f6", // Azul
    "#10b981", // Verde
    "#f59e0b", // Amarelo
    "#ef4444", // Vermelho
    "#8b5cf6", // Roxo
    "#06b6d4", // Ciano
    "#ec4899", // Rosa
    "#84cc16", // Verde Lima
    "#f97316", // Laranja
    "#6b7280", // Cinza
  ];

  // Carregar dados ao montar o componente
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const categoriasData = await categoriaService.getAll();
      
      // Carregar estatísticas para cada categoria (simplificado - backend não tem filtro por categoria)
      const categoriasWithStats = categoriasData.map(categoria => ({
        ...categoria,
        quantidadeItens: 0,
        valorTotal: 0,
      }));

      setCategorias(categoriasWithStats);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
      setErrorMessage("Erro ao carregar categorias. Verifique se o servidor está rodando.");
    } finally {
      setLoading(false);
    }
  };

  // Sem filtro (backend não tem tipo)
  const categoriasFiltradas = categorias;

  // Calcular estatísticas
  const totalCategorias = categorias.length;
  const categoriasMaisUsadas = [...categorias]
    .sort((a, b) => b.quantidadeItens - a.quantidadeItens)
    .slice(0, 3);

  const handleOpenModal = (categoria?: Categoria) => {
    if (categoria) {
      setEditingId(categoria.idCategoria);
      setFormData({
        nome: categoria.nome,
        cor: categoria.cor || "#3b82f6",
      });
    } else {
      setEditingId(null);
      setFormData({
        nome: "",
        cor: "#3b82f6",
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
      if (!formData.nome || !formData.cor) {
        setErrorMessage("Preencha todos os campos obrigatórios!");
        return;
      }

      const categoriaData: CreateCategoriaRequest = {
        nome: formData.nome,
        cor: formData.cor,
      };

      if (editingId) {
        // Atualizar categoria existente
        const updateData: UpdateCategoriaRequest = categoriaData;
        await categoriaService.update(editingId, updateData);
        setSuccessMessage("Categoria atualizada com sucesso!");
      } else {
        // Criar nova categoria
        await categoriaService.create(categoriaData);
        setSuccessMessage("Categoria cadastrada com sucesso!");
      }

      // Recarregar dados
      await loadData();

      setTimeout(() => {
        handleCloseModal();
      }, 1500);
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      setErrorMessage("Erro ao salvar categoria. Tente novamente.");
    } finally {
      setLoadingForm(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      try {
        await categoriaService.delete(id);
        setSuccessMessage("Categoria excluída com sucesso!");
        await loadData();
        setTimeout(() => setSuccessMessage(""), 3000);
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        setErrorMessage("Erro ao excluir categoria. Tente novamente.");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    }
  };

  if (loading) {
    return (
      <section className="categorias-page">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
          <p>Carregando categorias...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="categorias-page">
      <header className="page-header">
        <div className="page-header-content">
          <h1 className="page-title-gradient">Gerenciar Categorias</h1>
          <p className="page-subtitle">
            Organize suas receitas e despesas em categorias personalizadas
          </p>
        </div>
        <button className="add-button" onClick={() => handleOpenModal()}>
          <span className="add-icon">+</span>
          Nova Categoria
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
          titulo="Total de Categorias"
          valor={totalCategorias.toString()}
          variacao="Categorias cadastradas"
          variacaoCor="neutro"
          iconBg="#8b5cf6"
          icon={
            <svg width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="12" rx="2" />
              <line x1="7" y1="1" x2="7" y2="4" />
              <line x1="17" y1="1" x2="17" y2="4" />
            </svg>
          }
        />

        <StatCard
          titulo="Mais Usada"
          valor={categoriasMaisUsadas[0]?.nome || "Nenhuma"}
          variacao={categoriasMaisUsadas[0] ? `${categoriasMaisUsadas[0].quantidadeItens} itens` : "0 itens"}
          variacaoCor="positivo"
          iconBg="#f59e0b"
          icon={
            <svg width="20" height="20" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          }
        />
      </div>

      {/* Sem filtros - backend não suporta tipo */}

      <div className="categorias-grid">
        {categoriasFiltradas.map((categoria) => (
          <div key={categoria.idCategoria} className="categoria-card">
            <div className="categoria-header">
              <div className="categoria-info">
                <div 
                  className="categoria-cor"
                  style={{ 
                    backgroundColor: categoria.cor,
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    marginRight: '12px'
                  }}
                />
                <div>
                  <h3 className="categoria-nome">{categoria.nome}</h3>
                </div>
              </div>
            </div>

            <div className="categoria-actions">
              <ActionButton 
                variant="edit"
                onClick={() => handleOpenModal(categoria)}
              />
              <ActionButton 
                variant="delete"
                onClick={() => handleDelete(categoria.idCategoria)}
              />
            </div>
          </div>
        ))}

        {categoriasFiltradas.length === 0 && (
          <div className="empty-state">
            <p>Nenhuma categoria cadastrada ainda.</p>
            <button onClick={() => handleOpenModal()}>
              Cadastrar primeira categoria
            </button>
          </div>
        )}
      </div>

      {/* Modal para criar/editar categoria */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title={editingId ? "Editar Categoria" : "Nova Categoria"}
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
              <label htmlFor="nome">Nome da Categoria *</label>
              <input
                type="text"
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Ex: Alimentação, Salário, Transporte..."
                required
              />
            </div>



            <div className="form-group">
              <label htmlFor="cor">Cor *</label>
              <div className="color-picker">
                <input
                  type="color"
                  id="cor"
                  value={formData.cor}
                  onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                  required
                />
                <div className="cores-predefinidas">
                  {coresPredefinidas.map((cor) => (
                    <button
                      key={cor}
                      type="button"
                      className={`cor-preset ${formData.cor === cor ? "selected" : ""}`}
                      style={{ backgroundColor: cor }}
                      onClick={() => setFormData({ ...formData, cor })}
                      title={cor}
                    />
                  ))}
                </div>
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
    </section>
  );
}