## Arquitetura do projeto
```bash
📂 printer-management-system/
    L 📂 controllers/                               # definição de rotas e funções
        L 📄 auth_controllers.py
        L 📄 post_controllers.py
        L 📄 user_controllers.py
    L 📄 __init__.py
    L 📄 app_config.py                              # configuração das extensões e rotas da API            
    L 📄 app.py                                     # inicialização da aplicação Flask e execução do server
    L 📄 db_config.py                               # configuração do banco de dados PostgreSQL
    L 📄 models.py                                  # modelos das entidades (usuários e postagens)
📂 postman-tests/
    L 📄 Postify-Testes.postman_collection.json     # arquivo de testes para o Postman
📄 .gitignore
📄 docker-compose.yml                               # configuração do Docker
📄 Dockerfile                                       
📄 README.md
📄 requirements.txt                                 # requisitos para rodar o projeto
```