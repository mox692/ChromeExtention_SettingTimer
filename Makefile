

.PHONY: bundle
bundle:
	npm run build-content
	npm run build-background
	npm run build-popup
	cd extension && zip -r ../setting_timer_extension.zip ./*
