FROM gitpod/workspace-full

USER gitpod

RUN sudo apt-get -q update && \
    sudo apt-get install --no-install-recommends --assume-yes -q chromium-browser && \
    sudo rm -rf /var/lib/apt/lists/*
