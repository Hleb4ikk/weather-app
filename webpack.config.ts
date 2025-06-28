import path from "path";

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ""),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};
