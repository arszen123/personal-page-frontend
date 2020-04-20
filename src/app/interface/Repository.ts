export interface Repository {
  /**
   * Save or update all entity if already has an id.
   * @param data
   */
  saveAll(data);

  /**
   * Save entity
   * @param data
   */
  save(data);

  /**
   * Update entity
   * @param id
   * @param data
   */
  update(id, data);

  /**
   * Delete all entity by ids
   * @param ids
   */
  deleteAll(ids);

  /**
   * Delete entity
   * @param id
   */
  delete(id);

  /**
   * Get all entities
   */
  getAll();

  /**
   * Get entity by id
   */
  get(id);
}
