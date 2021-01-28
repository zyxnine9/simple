const timestamp = new Date().getTime()

module.exports = {
    assetsDir: "./",
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : '/',
    devServer: {
        port: 8080,
        // open: true,
        proxy: {
            '/api': {
                target: 'https://acad-access.pcl.ac.cn/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
            '/get_token/': {
                target: 'https://acad-access.pcl.ac.cn/',
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