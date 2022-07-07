export default {
  watch: {
    exclude: ['storage.db','node_modules/**']
  }
};

// This should prevent the dev server from being rebuild when storage.db changes
