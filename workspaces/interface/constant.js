const isDevelopment = process.env.NODE_ENV === 'development'
export const server_url = isDevelopment ? 'http://localhost:8080/' : 'http://140.99.243.243:8080/'