const PAGES = {
  HOME: {
    PATH: "/",
    TITLE: "ホーム",
    DESCRIPTION: "ホームです",
  },
  CONTRIBUTES_NEW: {
    PATH: "/contributes/new",
    TITLE: "新規投稿",
    DESCRIPTION: "投稿を作成してみましょう",
  },
  CONTRIBUTES_EDIT: {
    TITLE: "投稿編集",
    DESCRIPTION: "投稿を編集してみましょう",
  },
} as const;

export default PAGES;
