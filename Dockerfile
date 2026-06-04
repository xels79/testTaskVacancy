FROM debian:13
RUN apt update
RUN apt install -y curl adduser nginx

# #node25.16 + npm
# RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /usr/share/keyrings/nodesource.gpg
# RUN echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_24.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list
# RUN apt install -y nodejs npm

#mc
# RUN apt install -y mc


RUN groupadd appgroup --system
RUN adduser --system appuser --ingroup appgroup --home /home/appuser
WORKDIR /home/appuser
USER appuser:appgroup
RUN mkdir -p ./app 
# RUN chown -R appuser:appgroup /app

ENV NVM_DIR=/home/appuser/.nvm
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install 24.16.0"

USER root:root
ENV PATH="/home/appuser/.nvm/versions/node/v24.16.0/bin:${PATH}"
COPY ./client/ /home/appuser/app/client
RUN chown appuser:appgroup /home/appuser/app/client -R

USER appuser:appgroup
WORKDIR /home/appuser/app/client
# RUN cd /app/client
RUN npm i
RUN npm run build

USER root:root
COPY ./server/ /home/appuser/app/server
RUN chown appuser:appgroup /home/appuser/app/server -R

USER appuser:appgroup
WORKDIR /home/appuser/app/server
# RUN rm -r dist
RUN npm i
RUN npm install -g @nestjs/cli
RUN npm run build



EXPOSE 80
COPY ./entri.sh /
COPY ./server-start.sh /


USER root:root
COPY ./default /etc/nginx/sites-available/default
# CMD ["bash", "/entry.sh"]
ENTRYPOINT ["/bin/bash", "/entri.sh"]