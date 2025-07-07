# 🖨️ CentralPrint – Desafio Técnico

Sistema de gestão de impressoras corporativas desenvolvido com abordagem fullstack, com backend SpringBoot e frontend Next.js. Projeto desenvolvido como desafio de habilidades técnicas.

---

## Sumário
Tecnologias utilizadas
Arquitetura do projeto
Endpoints da API
Como rodar
Testes Postman
Créditos

- [Funcionalidades](#funcionalidades)  
- [Tecnologias utilizadas](#tecnologias-utilizadas)  
- [Como Rodar o Projeto](#como-rodar-o-projeto)  
- [Lista de endpoints](#lista-de-endpoints)  
- [Capturas de Tela](#capturas-de-tela)  
- [Créditos](#creditos)  

---

## Funcionalidades
- CRUD básico de impressoras para administração.
- Sincronização automática das impressoras a cada 1 hora.
- Registro de estatísticas da última sincronização.

---

## Tecnologias e ferramentas utilizadas:
- Java
- Spring Boot  
- MySQL
- WebClient (Spring WebFlux)
- Validação de formulários com Zod
- Next.js

---

## Como rodar:

#### Pré-requisitos:
Antes de rodar o projeto, tenha certeza de ter instalados:
- Docker
- Docker Compose
- Postman
- PgAdmin, DBeaver, ou algum outro SGDB compatível com PostgreSQL para melhor checagem do banco de dados (opcional)
</br>

1. Clone o repositório:

```bash
git clone https://github.com/beaalmeidas/desafio-tecnico-m4all.git


## Arquitetura do projeto

```bash
📂 printer-management-system/
    L 📂 backend/
        L 📂 src/
            L 📂 main/
                L 📂 java/
                    L 📂 com/
                        L 📂 printers/
                            L 📂 printerManagementSystem/
                                L 📂 controller/
                                L 📂 model/
                                    L PrinterRepository.java
                                L 📂 repository/
                                L 📂 service/
                                L PrinterManagementApplication.java
                L 📂 resources/
```
