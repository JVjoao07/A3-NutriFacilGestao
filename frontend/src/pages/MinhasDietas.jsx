import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function MinhasDietas() {
  const { user } = useContext(AuthContext);
  const [dietas, setDietas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDietas() {
      setLoading(true);
      try {
        // Exemplo: ajuste a URL conforme seu backend
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/minhas-dietas`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setDietas(data.dietas || []);
      } catch {
        setDietas([]);
      }
      setLoading(false);
    }
    fetchDietas();
  }, []);

  return (
    <section style={{ maxWidth: 900, margin: "40px auto", padding: 32, background: "#f4f8f6", borderRadius: 18 }}>
      <h2 style={{ textAlign: "center", color: "#2d8659", fontSize: 32, marginBottom: 32 }}>Minhas Dietas</h2>
      {loading ? (
        <div style={{ textAlign: "center" }}>Carregando...</div>
      ) : dietas.length === 0 ? (
        <div style={{ textAlign: "center", color: "#888" }}>Nenhuma dieta cadastrada.</div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {dietas.map((dieta, idx) => (
            <li key={dieta.id || idx} style={{
              background: "#fff",
              borderRadius: 12,
              boxShadow: "0 2px 8px #0001",
              marginBottom: 24,
              padding: 24
            }}>
              <h3 style={{ color: "#1976d2", marginBottom: 10, fontSize: 22 }}>
                {dieta.nome || `Dieta #${idx + 1}`}
              </h3>
              <div><b>Objetivo:</b> {dieta.objetivo}</div>
              <div><b>Tipo:</b> {dieta.dieta}</div>
              <div><b>Calorias:</b> {dieta.calorias} kcal</div>
              <div><b>Resumo:</b> {dieta.resumo || "Plano personalizado"}</div>
              {/* Adicione mais campos conforme sua estrutura */}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default MinhasDietas;