FROM node:18-alpine AS base
# base
FROM base AS deps
RUN apk add --no-cache libc6-compat && \
    npm install -g npm@10.5.0
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci
#builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build
#runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 5000

ENV PORT 5000

ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]