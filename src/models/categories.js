
import db from './db.js';

/*
 * Retrieve all service project categories.
 */
const getAllCategories = async () => {
    const query = `
        SELECT
            category_id,
            name
        FROM public.category
        ORDER BY name ASC;
    `;

    const result = await db.query(query);

    return result.rows;
};

/*
 * Retrieve a specific category by ID.
 */
const getCategoryDetails = async (categoryId) => {
    const query = `
        SELECT
            category_id,
            name
        FROM public.category
        WHERE category_id = $1;
    `;

    const result = await db.query(query, [categoryId]);

    return result.rows.length > 0 ? result.rows[0] : null;
};

/*
 * Retrieve all categories associated with a service project.
 */
const getCategoriesByProjectId = async (projectId) => {
    const query = `
        SELECT
            c.category_id,
            c.name
        FROM public.category AS c
        INNER JOIN public.project_category AS pc
            ON c.category_id = pc.category_id
        WHERE pc.project_id = $1
        ORDER BY c.name ASC;
    `;

    const result = await db.query(query, [projectId]);

    return result.rows;
};

/*
 * Assign a category to a service project.
 */
const assignCategoryToProject = async (categoryId, projectId) => {
    // W04: I followed the sample's parameter order (categoryId, projectId).
    const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

    await db.query(query, [categoryId, projectId]);
};

/*
 * Update the categories assigned to a service project.
 */
const updateCategoryAssignments = async (projectId, categoryIds) => {
    // First, remove existing category assignments for the project
    const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;

    await db.query(deleteQuery, [projectId]);

    // Next, add the new category assignments
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(categoryId, projectId);
    }
};

export {
    getAllCategories,
    getCategoryDetails,
    getCategoriesByProjectId,
    updateCategoryAssignments
};
