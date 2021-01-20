const timestamp = new Date().getTime()

module.exports = {
    assetsDir: "./",
    publicPath: process.env.NODE_ENV === 'production'
        ? '/pclAuth/webFront/'
        : '/',
    devServer: {
        port: 8080,
        // open: true,
        proxy: {
            '/api': {
                target: 'http://192.168.203.66:20002',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
            '/get_token/': {
                target: 'http://192.168.203.66:20002',
                changeOrigin: true,
                pathRewrite: {
                    '^/get_token/': '/get_token/'
                }
            },
        }
    },
    configureWebpack: {
        output: {
            filename: `./js/[name].${timestamp}.js`,
            chunkFilename: `./js/[name].${timestamp}.js`,
        }
    }
}