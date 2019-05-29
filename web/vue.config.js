module.exports = {
    publicPath: "./",
    outputDir: "../server/src/main/resources/static",
    css: {
        extract: true, // 允许生成 CSS source maps?
        sourceMap: false, // pass custom options to pre-processor loaders. e.g. to pass options to // sass-loader, use { sass: { ... } }
        loaderOptions: {
            sass: {
                data: `@import "@/assets/base.scss";`
            }
        },
        modules: false
    }
};
