IMAGE := netwerkdigitaalerfgoed/bikeshed:5.3.2
BS := $(wildcard *.bs infra/*.bs juridisch/*.bs systeemarchitectuur/*.bs data-architectuur/*.bs)
DOCKER := docker run --rm -v "`pwd`:/spec" -w /spec $(IMAGE)

help:
	@echo "Genereer HTML uit de Bikeshed-brondocumenten:"
	@echo "  make spec    Bouw alle documenten (root, infra/, juridisch/, systeemarchitectuur/, data-architectuur/)"
	@echo "  make watch   Bouw index.html telkens als index.bs wijzigt"

spec:
	$(DOCKER) sh -c 'for f in $(BS); do echo "bikeshed: $$f"; bikeshed --no-update spec $$f $${f%.bs}.html; done'

watch:
	$(DOCKER) sh -c "bikeshed --no-update watch index.bs index.html"

.PHONY: help spec watch
