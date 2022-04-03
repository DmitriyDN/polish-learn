FROM node:16
WORKDIR /app
COPY backend/package.json ./backend/package.json
COPY backend/yarn.lock ./backend/yarn.lock
COPY polish-fe/package.json ./polish-fe/package.json
COPY polish-fe/yarn.lock ./polish-fe/yarn.lock
COPY polish-fe/yarn.lock ./polish-fe/yarn.lock
RUN cd backend && yarn install --frozen-lockfile
RUN cd polish-fe && yarn install --frozen-lockfile
COPY backend/. backend/.
COPY polish-fe/. polish-fe/.
COPY interfaces/. interfaces/.
RUN cd polish-fe && yarn build
RUN cd backend && yarn startmon

FROM nginx
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=polish-fe/build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]