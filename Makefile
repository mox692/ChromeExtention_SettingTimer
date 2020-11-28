

.PHONY: bundle
bundle:
	npm run build-content
	npm run build-popup
	npm run build-background
	cd extension && zip -r ../setting_timer_extension.zip ./*
