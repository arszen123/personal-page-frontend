export interface OnBeforeDeactivate {
  /**
   * @return true if can deactivate or false to prevent it.
   */
  onBeforeDeactivate(): boolean;
}
