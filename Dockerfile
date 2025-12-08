# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build
RUN npm prune --production

# Production stage
FROM node:22-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S sveltekit -u 1001

# Copy built application
COPY --from=builder --chown=sveltekit:nodejs /app/build build/
COPY --from=builder --chown=sveltekit:nodejs /app/node_modules node_modules/
COPY --from=builder --chown=sveltekit:nodejs /app/package.json .

# Switch to non-root user
USER sveltekit

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start with dumb-init
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "build"]
