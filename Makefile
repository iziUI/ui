RUN:=yarn

NAME:=iziui

-include .env
export NPM_TOKEN

# STYLE BOX #
ERROR_BOX=\x1b[41m
SUCCESS_BOX=\x1b[42m
RESET_BOX=\x1b[0m
WARN_BOX=\x1b[30;43m

# STYLE COLOR #
ERROR_TEXT=\x1b[31m
SUCCESS_TEXT=\x1b[32m
RESET_TEXT=\x1b[0m
WARN_TEXT=\x1b[33m
INFO_TEXT=\033[36m

# SYMBOLS
PRISM=\342\227\206
ARROW=\342\226\270
CHECK=\342\234\224
TIMES=\342\234\226

# ------------------------------------------------------------------------------------ #

# Função para executar comandos dentro do workspace
define run_in_workspace
	@workspace='@$(NAME)/$(1)'; \
	echo "------------------------------------------------------------------------------"; \
    printf "${INFO_TEXT}${PRISM} $${workspace}\n"; \
    printf "${WARN_TEXT}${ARROW} $(2) $(3)${RESET_TEXT}\n"; \
    start=$$(date +%s); \
    started_at=$$(date '+%H:%M:%S'); \
    echo "Started at: " "$$started_at"; \
    echo "------------------------------------------------------------------------------"; \
    $(RUN) workspace @$(NAME)/$(1) $(2) $(3); \
    status=$$?; \
    end=$$(date +%s); \
    finished_at=$$(date '+%H:%M:%S'); \
    elapsed=$$((end - start)); \
    minutes=$$((elapsed / 60)); \
    seconds=$$((elapsed % 60)); \
    echo "------------------------------------------------------------------------------"; \
	if [ "$$status" -eq 0 ]; then \
        printf "${SUCCESS_TEXT}${CHECK} [SUCCESS] $(2) $(3)${RESET_TEXT}\n"; \
    else \
        printf "${ERROR_TEXT}${TIMES} [ERROR] $(2) $(3)${RESET_TEXT}\n"; \
    fi; \
    printf "Duration: %dm %02ds\n" "$$minutes" "$$seconds"; \
    printf "Exit code: %s\n" "$$status"; \
    echo "------------------------------------------------------------------------------"; \
    exit "$$status"
endef

# Extrair parâmetros dos argumentos posicionais
.PHONY: run
run:
	$(eval PROJECT := $(word 2, $(MAKECMDGOALS)))
	$(eval CMD := $(wordlist 3, $(words $(MAKECMDGOALS)), $(MAKECMDGOALS)))
	$(call run_in_workspace,$(PROJECT),$(CMD))

# Para evitar que make tente interpretar os argumentos como alvos
%:
	@:

# ----------------------------------------------- #

install:
	$(RUN)

setup:
	make clean-modules
	$(RUN) install
	make run tokens build

define delete_dependencies
	@echo delete_dependencies $(1)
	rm -Rf ./packages/$(1)/node_modules
endef

clean-modules:
	rm -Rf ./node_modules
	$(call delete_dependencies,toolkit)
	$(call delete_dependencies,tokens)
	$(call delete_dependencies,styles)
	$(call delete_dependencies,core)
	$(call delete_dependencies,apps/react)
	@printf "${SUCCESS_TEXT} dependencies deleted successfully ${RESET_TEXT}\n";
