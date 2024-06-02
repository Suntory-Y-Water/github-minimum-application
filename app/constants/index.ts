type EmojiMap = {
  [key: string]: string;
};

/** イシューのラベルを管理する定数 */
export const LABEL_TO_EMOJI: EmojiMap = {
  bug: '🐛', // バグ
  enhancement: '✨', // 改善
  documentation: '📚', // ドキュメント
  duplicate: '🔄', // 重複
  goodFirstIssue: '🌱', // 初心者向け
  helpWanted: '🙋', // 助けが必要
  invalid: '❌', // 無効
  question: '❓', // 質問
  wontfix: '🚫', // 修正しない
};

/** イシューのステータスを管理する定数 */
export const STATUS_TO_EMOJI: EmojiMap = {
  OPEN: '🟢',
  CLOSED: '🔴',
};

export const Constants = {
  /** 画面に表示する件数 */
  DISPLAY_COUNT: 10,

  /** GitHubGraphQLAPIで一度に取得する件数 */
  FETCH_COUNT: 100,
};
