import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      style={{
        width: "100%",
        minHeight: 60,
        background: "#e0f7fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxShadow: "0 2px 8px #0001",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div className="logo" role="banner" style={{ display: "flex", alignItems: "center" }}>
        <svg
          className="logo-svg"
          viewBox="0 0 200 50"
          aria-label="NutriFácil Logo"
          style={{ height: 48, width: 180 }}
        >
          {/* Folha estilizada */}
          <path
            className="logo-leaf"
            d="M30 10 C40 5, 45 15, 40 25 C35 35, 25 35, 20 25 C15 15, 20 5, 30 10 Z"
            fill="#2ecc71"
          />
          {/* Círculo do prato */}
          <circle
            className="logo-plate"
            cx="30"
            cy="25"
            r="15"
            fill="none"
            stroke="#2ecc71"
            strokeWidth="2"
          />
          {/* Texto NutriFácil */}
          <text
            className="logo-text"
            x="55"
            y="30"
            fill="#2c3e50"
            style={{ fontSize: 24, fontWeight: 700, fontFamily: "inherit" }}
          >
            NutriFácil
          </text>
        </svg>
      </div>
      <nav>
        <ul
          className="menu"
          style={{
            display: "flex",
            gap: "1.5rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          <li>
            <a
              href="/"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 17,
                padding: "8px 18px",
                borderRadius: 8,
              }}
            >
              Início
            </a>
          </li>
          <li>
            <a
              href="/dietas"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 17,
                padding: "8px 18px",
                borderRadius: 8,
              }}
            >
              Dietas
            </a>
          </li>
          <li>
            <a
              href="/contato"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 17,
                padding: "8px 18px",
                borderRadius: 8,
              }}
            >
              Contato
            </a>
          </li>
          <li>
            <a
              href="/minhas-dietas"
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: 17,
                padding: "8px 18px",
                borderRadius: 8,
              }}
            >
              Minhas Dietas
            </a>
          </li>
          {!user ? (
            <li>
              <button
                onClick={handleLogin}
                className="btn-menu"
                style={{
                  padding: "8px 18px",
                  fontSize: 17,
                  borderRadius: 8,
                  border: "none",
                  background: "#2d8659",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                  marginLeft: 8,
                }}
              >
                Login
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={handleLogout}
                className="btn-menu"
                style={{
                  padding: "8px 18px",
                  fontSize: 17,
                  borderRadius: 8,
                  border: "none",
                  background: "#c2185b",
                  color: "#fff",
                  cursor: "pointer",
                  fontWeight: 600,
                  marginLeft: 8,
                }}
              >
                Sair
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
