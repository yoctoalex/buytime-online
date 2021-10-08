// const { override, addBabelPlugins } = require('customize-cra')
//
// module.exports = override(
//     addBabelPlugins(
//         '@babel/plugin-proposal-nullish-coalescing-operator',
//         '@babel/plugin-syntax-optional-chaining'
//     )
// )

const {
    override,
    addExternalBabelPlugins,
} = require("customize-cra");

module.exports = {
    webpack: override(
        ...addExternalBabelPlugins(
            "@babel/plugin-proposal-nullish-coalescing-operator",
            '@babel/plugin-syntax-optional-chaining'
        ),
    ),
};