
import db from './db.js';

/*
 * Retrieve all service project categories
 * from the PostgreSQL database.
 */
const getAllCategories = async () => {
    const query = `
        SELECT category_id, name
        FROM public.category
        ORDER BY name ASC;
    `;

    const result = await db.query(query);

    return result.rows;
};

export { getAllCategories };
