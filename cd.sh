#!/bin/bash

git pull
pnpm install --frozen-lockfile
pnpm build
sudo cp votemyass.service /etc/systemd/system/votemyass.service
sudo systemctl daemon-reload
sudo systemctl restart votemyass