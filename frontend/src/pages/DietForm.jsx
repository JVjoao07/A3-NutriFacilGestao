import React, { useState } from "react";

export default function DietForm() {
  const [form, setForm] = useState({
    peso: "",
    altura: "",
    idade: "",
    sexo: "",
    objetivo: "",
    dieta: "",
    proteinas: [],
    vegetais: [],
    verduras: [],
    carboidratos: [],
    frutas: [],
    alergias: [],
    outras_alergias: "",
  });
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({
        ...prev,
        [name]: checked
          ? [...prev[name], value]
          : prev[name].filter((v) => v !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    // Mostra o resultado mesmo sem conexão
    setResultado({
      mensagem: "Plano alimentar gerado (exemplo local)",
      plano: {
        calorias: 2000,
        imc: 22.5,
        classificacao: "Peso normal",
        recomendacoes: [
          "Coma mais vegetais",
          "Beba 2 litros de água por dia",
          "Evite frituras"
        ],
        exemploRefeicao: {
          cafe: "Ovos mexidos + pão integral + fruta",
          almoco: "Arroz, feijão, frango grelhado, salada",
          jantar: "Sopa de legumes + fruta"
        }
      }
    });
    // Se quiser tentar a API, mantenha o código abaixo comentado:
    /*
    try {
      // ...seu código de requisição...
    } catch (err) {
      setErro("Erro de conexão com o servidor.");
    }
    */
  };

  // Imagens para cada categoria
  const images = {
    proteinas: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=60",
    vegetais: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=60",
    verduras: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&auto=format&fit=crop&q=60",
    carboidratos: "https://unsplash.com/pt-br/fotografias/pao-integral-no-prato-preto-eH7B2b5cCUg",
    frutas: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&auto=format&fit=crop&q=60",
    alergias: "https://unsplash.com/pt-br/fotografias/um-sinal-em-forma-de-triangulo-em-uma-parede-amarela-VO5w2Ida70s",
  };

  // Card style para categorias
  const cardStyle = {
    flex: "1 1 260px",
    background: "#fff",
    borderRadius: 18,
    padding: 24,
    boxShadow: "0 4px 16px #0002",
    marginBottom: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 240,
    maxWidth: 320,
    transition: "box-shadow 0.2s",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #cfd8dc",
    marginBottom: 12,
    fontSize: 16,
    background: "#f9f9f9",
  };

  const labelStyle = {
    fontWeight: 500,
    marginBottom: 6,
    display: "block",
    color: "#2d8659",
  };

  return (
    <section
      className="dietas"
      aria-label="Plano alimentar personalizado"
      style={{
        maxWidth: 1200,
        margin: "40px auto",
        background: "#f4f8f6",
        borderRadius: 24,
        padding: 40,
        boxShadow: "0 8px 32px #0001",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: 32,
          color: "#2d8659",
          fontSize: 38,
          letterSpacing: 1,
          fontWeight: 700,
        }}
      >
        Seu Plano Alimentar Personalizado
      </h2>
      <div
        className="dietas-intro"
        style={{
          width: "100%",
          margin: "0 auto 56px auto",
          padding: "0",
          borderBottom: "2px solid #e0e0e0",
          background: "linear-gradient(135deg, #e0f7fa 60%, #fffde7 100%)",
          borderRadius: 32,
          boxShadow: "0 8px 40px #0001",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80"
          alt="Mesa com alimentos saudáveis coloridos"
          style={{
            width: "100%",
            maxHeight: 260,
            objectFit: "cover",
            display: "block",
            borderRadius: "32px 32px 0 0"
          }}
        />
        <p style={{
          fontSize: 28,
          color: "#185a9d",
          lineHeight: 1.6,
          textAlign: "center",
          fontWeight: 600,
          maxWidth: 900,
          margin: "32px 0 32px 0",
          textShadow: "0 2px 8px #fff8"
        }}>
          Personalize seu plano alimentar de acordo com suas preferências e necessidades.
        </p>
      </div>
      <form className="plano-form" aria-label="Formulário de plano alimentar" onSubmit={handleSubmit}>
        {/* Informações Pessoais */}
        <div
          className="form-section"
          style={{
            marginBottom: 36,
            padding: 32,
            background: "#e8f5e9",
            borderRadius: 16,
            boxShadow: "0 2px 8px #0001",
          }}
        >
          <h3 style={{ color: "#2d8659", marginBottom: 24, fontSize: 26, textAlign: "center" }}>Informações Pessoais</h3>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={labelStyle}>Peso (kg):</label>
              <input type="number" name="peso" min="30" max="300" step="0.1" required value={form.peso} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={labelStyle}>Altura (cm):</label>
              <input type="number" name="altura" min="100" max="250" required value={form.altura} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={labelStyle}>Idade (anos):</label>
              <input type="number" name="idade" min="12" max="120" required value={form.idade} onChange={handleChange} style={inputStyle} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={labelStyle}>Sexo:</label>
              <div style={{ display: "flex", gap: 16 }}>
                <label>
                  <input type="radio" name="sexo" value="masculino" checked={form.sexo === "masculino"} onChange={handleChange} required />
                  Masculino
                </label>
                <label>
                  <input type="radio" name="sexo" value="feminino" checked={form.sexo === "feminino"} onChange={handleChange} required />
                  Feminino
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Objetivos e Preferências */}
        <div
          className="form-section"
          style={{
            marginBottom: 36,
            padding: 32,
            background: "#e3f2fd",
            borderRadius: 16,
            boxShadow: "0 2px 8px #0001",
          }}
        >
          <h3 style={{ color: "#1976d2", marginBottom: 24, fontSize: 26, textAlign: "center" }}>Objetivos e Preferências</h3>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={labelStyle}>Objetivo Principal:</label>
              <select name="objetivo" required value={form.objetivo} onChange={handleChange} style={inputStyle}>
                <option value="">Selecione seu objetivo</option>
                <option value="emagrecimento">Emagrecimento</option>
                <option value="hipertrofia">Hipertrofia</option>
                <option value="manutencao">Manutenção do Peso</option>
                <option value="saude">Melhoria da Saúde</option>
              </select>
            </div>
            <div style={{ flex: 1, minWidth: 220 }}>
              <label style={labelStyle}>Tipo de Dieta:</label>
              <select name="dieta" required value={form.dieta} onChange={handleChange} style={inputStyle}>
                <option value="">Selecione a dieta</option>
                <option value="Mediterrânea">Mediterrânea</option>
                <option value="Low Carb">Low Carb</option>
                <option value="Cetogênica">Cetogênica</option>
                <option value="Vegetariana">Vegetariana</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preferências Alimentares */}
        <div
          className="form-section"
          style={{
            marginBottom: 36,
            padding: 32,
            background: "#fffde7",
            borderRadius: 16,
            boxShadow: "0 2px 8px #0001",
          }}
        >
          <h3 style={{ color: "#f9a825", marginBottom: 28, fontSize: 26, textAlign: "center" }}>Preferências Alimentares</h3>
          <div className="food-preferences-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 32,
            justifyContent: "center"
          }}>
            {/* Proteínas */}
            <div style={cardStyle}>
              <img src={images.proteinas} alt="Proteínas" style={{ width: "100%", borderRadius: 10, marginBottom: 12, maxHeight: 120, objectFit: "cover" }} />
              <h4 style={{ margin: "12px 0", color: "#2d8659", fontSize: 20 }}>Proteínas</h4>
              <div style={{ textAlign: "left", width: "100%" }}>
                <label><input type="checkbox" name="proteinas" value="frango" onChange={handleChange} checked={form.proteinas.includes("frango")} /> Frango</label><br />
                <label><input type="checkbox" name="proteinas" value="peixe" onChange={handleChange} checked={form.proteinas.includes("peixe")} /> Peixe</label><br />
                <label><input type="checkbox" name="proteinas" value="carne-vermelha" onChange={handleChange} checked={form.proteinas.includes("carne-vermelha")} /> Carne Vermelha</label><br />
                <label><input type="checkbox" name="proteinas" value="ovos" onChange={handleChange} checked={form.proteinas.includes("ovos")} /> Ovos</label><br />
                <label><input type="checkbox" name="proteinas" value="tofu" onChange={handleChange} checked={form.proteinas.includes("tofu")} /> Proteína Vegetal</label>
              </div>
            </div>
            {/* Legumes */}
            <div style={cardStyle}>
              <img src={images.vegetais} alt="Legumes" style={{ width: "100%", borderRadius: 10, marginBottom: 12, maxHeight: 120, objectFit: "cover" }} />
              <h4 style={{ margin: "12px 0", color: "#2d8659", fontSize: 20 }}>Legumes</h4>
              <div style={{ textAlign: "left", width: "100%" }}>
                <label><input type="checkbox" name="vegetais" value="cenoura" onChange={handleChange} checked={form.vegetais.includes("cenoura")} /> Cenoura</label><br />
                <label><input type="checkbox" name="vegetais" value="brocolis" onChange={handleChange} checked={form.vegetais.includes("brocolis")} /> Brócolis</label><br />
                <label><input type="checkbox" name="vegetais" value="abobrinha" onChange={handleChange} checked={form.vegetais.includes("abobrinha")} /> Abobrinha</label><br />
                <label><input type="checkbox" name="vegetais" value="berinjela" onChange={handleChange} checked={form.vegetais.includes("berinjela")} /> Berinjela</label><br />
                <label><input type="checkbox" name="vegetais" value="pimentao" onChange={handleChange} checked={form.vegetais.includes("pimentao")} /> Pimentão</label>
              </div>
            </div>
            {/* Verduras */}
            <div style={cardStyle}>
              <img src={images.verduras} alt="Verduras" style={{ width: "100%", borderRadius: 10, marginBottom: 12, maxHeight: 120, objectFit: "cover" }} />
              <h4 style={{ margin: "12px 0", color: "#2d8659", fontSize: 20 }}>Verduras</h4>
              <div style={{ textAlign: "left", width: "100%" }}>
                <label><input type="checkbox" name="verduras" value="alface" onChange={handleChange} checked={form.verduras.includes("alface")} /> Alface</label><br />
                <label><input type="checkbox" name="verduras" value="espinafre" onChange={handleChange} checked={form.verduras.includes("espinafre")} /> Espinafre</label><br />
                <label><input type="checkbox" name="verduras" value="rucula" onChange={handleChange} checked={form.verduras.includes("rucula")} /> Rúcula</label><br />
                <label><input type="checkbox" name="verduras" value="couve" onChange={handleChange} checked={form.verduras.includes("couve")} /> Couve</label><br />
                <label><input type="checkbox" name="verduras" value="agriao" onChange={handleChange} checked={form.verduras.includes("agriao")} /> Agrião</label>
              </div>
            </div>
            {/* Carboidratos */}
            <div style={cardStyle}>
              <img src={images.carboidratos} alt="Carboidratos" style={{ width: "100%", borderRadius: 10, marginBottom: 12, maxHeight: 120, objectFit: "cover" }} />
              <h4 style={{ margin: "12px 0", color: "#2d8659", fontSize: 20 }}>Carboidratos</h4>
              <div style={{ textAlign: "left", width: "100%" }}>
                <label><input type="checkbox" name="carboidratos" value="arroz" onChange={handleChange} checked={form.carboidratos.includes("arroz")} /> Arroz</label><br />
                <label><input type="checkbox" name="carboidratos" value="batata" onChange={handleChange} checked={form.carboidratos.includes("batata")} /> Batata</label><br />
                <label><input type="checkbox" name="carboidratos" value="macarrao" onChange={handleChange} checked={form.carboidratos.includes("macarrao")} /> Macarrão</label><br />
                <label><input type="checkbox" name="carboidratos" value="quinoa" onChange={handleChange} checked={form.carboidratos.includes("quinoa")} /> Quinoa</label><br />
                <label><input type="checkbox" name="carboidratos" value="batata-doce" onChange={handleChange} checked={form.carboidratos.includes("batata-doce")} /> Batata Doce</label>
              </div>
            </div>
            {/* Frutas */}
            <div style={cardStyle}>
              <img src={images.frutas} alt="Frutas" style={{ width: "100%", borderRadius: 10, marginBottom: 12, maxHeight: 120, objectFit: "cover" }} />
              <h4 style={{ margin: "12px 0", color: "#2d8659", fontSize: 20 }}>Frutas</h4>
              <div style={{ textAlign: "left", width: "100%" }}>
                <label><input type="checkbox" name="frutas" value="maca" onChange={handleChange} checked={form.frutas.includes("maca")} /> Maçã</label><br />
                <label><input type="checkbox" name="frutas" value="banana" onChange={handleChange} checked={form.frutas.includes("banana")} /> Banana</label><br />
                <label><input type="checkbox" name="frutas" value="laranja" onChange={handleChange} checked={form.frutas.includes("laranja")} /> Laranja</label><br />
                <label><input type="checkbox" name="frutas" value="morango" onChange={handleChange} checked={form.frutas.includes("morango")} /> Morango</label><br />
                <label><input type="checkbox" name="frutas" value="uva" onChange={handleChange} checked={form.frutas.includes("uva")} /> Uva</label><br />
                <label><input type="checkbox" name="frutas" value="manga" onChange={handleChange} checked={form.frutas.includes("manga")} /> Manga</label>
              </div>
            </div>
          </div>
        </div>

        {/* Alergias e Intolerâncias */}
        <div
          className="form-section"
          style={{
            marginBottom: 36,
            padding: 32,
            background: "#fce4ec",
            borderRadius: 16,
            boxShadow: "0 2px 8px #0001",
          }}
        >
          <h3 style={{ color: "#c2185b", marginBottom: 24, fontSize: 26, textAlign: "center" }}>Alergias e Intolerâncias</h3>
          <div style={{ display: "flex", gap: 36, alignItems: "flex-start", flexWrap: "wrap" }}>
            <img src={images.alergias} alt="Alergias" style={{ width: 140, borderRadius: 12, marginTop: 8, boxShadow: "0 1px 4px #0001" }} />
            <div style={{ flex: 1, minWidth: 220 }}>
              <label><input type="checkbox" name="alergias" value="lactose" onChange={handleChange} checked={form.alergias.includes("lactose")} /> Lactose</label><br />
              <label><input type="checkbox" name="alergias" value="gluten" onChange={handleChange} checked={form.alergias.includes("gluten")} /> Glúten</label><br />
              <label><input type="checkbox" name="alergias" value="leite" onChange={handleChange} checked={form.alergias.includes("leite")} /> Proteína do Leite</label><br />
              <label><input type="checkbox" name="alergias" value="ovo" onChange={handleChange} checked={form.alergias.includes("ovo")} /> Ovo</label><br />
              <label><input type="checkbox" name="alergias" value="frutos_mar" onChange={handleChange} checked={form.alergias.includes("frutos_mar")} /> Frutos do Mar</label><br />
              <label><input type="checkbox" name="alergias" value="amendoim" onChange={handleChange} checked={form.alergias.includes("amendoim")} /> Amendoim</label><br />
              <label><input type="checkbox" name="alergias" value="soja" onChange={handleChange} checked={form.alergias.includes("soja")} /> Soja</label><br />
              <label><input type="checkbox" name="alergias" value="nenhuma" onChange={handleChange} checked={form.alergias.includes("nenhuma")} /> Nenhuma</label>
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>Outras Alergias ou Intolerâncias:</label>
                <input type="text" name="outras_alergias" value={form.outras_alergias} onChange={handleChange} placeholder="Digite outras alergias ou intolerâncias" style={inputStyle} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              background: "#2d8659",
              color: "#fff",
              padding: "18px 48px",
              border: "none",
              borderRadius: 12,
              fontSize: 22,
              cursor: "pointer",
              boxShadow: "0 2px 8px #0002",
              fontWeight: "bold",
              letterSpacing: 1,
              transition: "background 0.2s",
            }}
          >
            Gerar Plano Alimentar
          </button>
        </div>
      </form>

      {/* Mostra o resultado sempre que existir */}
      {resultado && (
        <div
          id="resultado-plano"
          className="resultado-plano"
          style={{
            marginTop: 48,
            background: "linear-gradient(135deg, #e0f7fa 60%, #fffde7 100%)",
            borderRadius: 24,
            padding: 40,
            boxShadow: "0 8px 32px #0002",
            maxWidth: 800,
            marginLeft: "auto",
            marginRight: "auto",
            color: "#2d8659",
            fontFamily: "inherit",
            animation: "fadeIn 0.7s"
          }}
        >
          <h3 style={{
            color: "#2d8659",
            fontSize: 32,
            marginBottom: 28,
            textAlign: "center",
            fontWeight: 800,
            letterSpacing: 1,
            textShadow: "0 2px 8px #fff8"
          }}>
            <span role="img" aria-label="Prato">🍽️</span> Seu Plano Alimentar Personalizado
          </h3>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 32,
            justifyContent: "center",
            marginBottom: 32
          }}>
            <div style={{
              flex: "1 1 260px",
              background: "#e8f5e9",
              borderRadius: 18,
              padding: 28,
              minWidth: 220,
              boxShadow: "0 4px 16px #0001",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <h4 style={{ margin: "0 0 14px 0", color: "#388e3c", fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>Resumo</h4>
              <div style={{ fontSize: 18, marginBottom: 6 }}><b>Calorias:</b> {resultado.plano.calorias} kcal</div>
              <div style={{ fontSize: 18, marginBottom: 6 }}><b>IMC:</b> {resultado.plano.imc}</div>
              <div style={{ fontSize: 18 }}><b>Classificação:</b> {resultado.plano.classificacao}</div>
            </div>
            <div style={{
              flex: "1 1 260px",
              background: "#e3f2fd",
              borderRadius: 18,
              padding: 28,
              minWidth: 220,
              boxShadow: "0 4px 16px #0001",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <h4 style={{ margin: "0 0 14px 0", color: "#1976d2", fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>Recomendações</h4>
              <ul style={{ paddingLeft: 18, margin: 0, color: "#1976d2", fontSize: 17 }}>
                {resultado.plano.recomendacoes.map((rec, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{
            background: "#fffde7",
            borderRadius: 18,
            padding: 28,
            boxShadow: "0 2px 8px #0001",
            marginBottom: 28,
            marginTop: 8
          }}>
            <h4 style={{ color: "#f9a825", fontSize: 22, marginBottom: 14, fontWeight: 700, letterSpacing: 1 }}>
              <span role="img" aria-label="Refeição">🥗</span> Exemplo de Refeições
            </h4>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", justifyContent: "center" }}>
              <div style={{ flex: 1, minWidth: 180, marginBottom: 12 }}>
                <b style={{ color: "#2d8659" }}>Café da manhã:</b>
                <div style={{ fontSize: 17 }}>{resultado.plano.exemploRefeicao.cafe}</div>
              </div>
              <div style={{ flex: 1, minWidth: 180, marginBottom: 12 }}>
                <b style={{ color: "#2d8659" }}>Almoço:</b>
                <div style={{ fontSize: 17 }}>{resultado.plano.exemploRefeicao.almoco}</div>
              </div>
              <div style={{ flex: 1, minWidth: 180, marginBottom: 12 }}>
                <b style={{ color: "#2d8659" }}>Jantar:</b>
                <div style={{ fontSize: 17 }}>{resultado.plano.exemploRefeicao.jantar}</div>
              </div>
            </div>
          </div>
          {resultado.mensagem && (
            <div style={{
              textAlign: "center",
              color: "#888",
              fontSize: 17,
              marginTop: 18,
              fontStyle: "italic"
            }}>
              {resultado.mensagem}
            </div>
          )}
        </div>
      )}
    </section>
  );
}