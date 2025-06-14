# NutriFácil - Sistema de Gestão de Dietas e Nutrição

## 📋 Descrição
NutriFácil é um sistema desenvolvido em Java para auxiliar usuários na gestão de suas dietas, cálculo de indicadores de saúde e recomendações alimentares personalizadas.

## 🎯 Funcionalidades Principais
- Seleção de dietas (Mediterrânea, Low Carb, Cetogênica, Vegetariana)
- Cálculo de Taxa Metabólica Basal (TMB)
- Cálculo de Índice de Massa Corporal (IMC)
- Cálculo de Consumo Diário de Água
- Recomendações de alimentos por categoria
- Gestão de restrições alimentares
- Interface intuitiva e amigável

## 🛠️ Tecnologias Utilizadas
- Java 17
- JUnit 5 (para testes)
- Maven (gerenciamento de dependências)

## 📦 Estrutura do Projeto
```
nutrifacil/
├── src/
│   ├── main/
│   │   └── java/
│   │       └── com/
│   │           └── nutrifacil/
│   │               ├── model/
│   │               ├── service/
│   │               ├── util/
│   │               └── Main.java
│   └── test/
│       └── java/
│           └── com/
│               └── nutrifacil/
│                   └── test/
├── pom.xml
└── README.md
```

## 🚀 Como Executar
1. Clone o repositório
2. Certifique-se de ter o Java 17 instalado
3. Execute `mvn clean install` para baixar as dependências
4. Execute `mvn exec:java -Dexec.mainClass="com.nutrifacil.Main"` para iniciar a aplicação

## 🧪 Testes
O projeto inclui testes unitários e de usabilidade. Para executar os testes:
```bash
mvn test
```

## 📊 Métricas de Qualidade
- Cobertura de testes: >80%
- Tempo médio de resposta: <2s
- Usabilidade: Avaliada através de testes com usuários reais

## 👥 Equipe
JOÃO VICTOR ALVES RA:422142090
ANA CAMILA
HUGO ALMEIDA
HEBERT BONIEK DE OLIVIERA SOUTO RA:422142014
ITALORESENDE

## 📅 Cronograma
- Data de Entrega: 18/06/25
- Sprint 1: Implementação do core (DD/MM)
- Sprint 2: Interface e testes (DD/MM)
- Sprint 3: Refinamentos e documentação (DD/MM)

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
