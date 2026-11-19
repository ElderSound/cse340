
import { getAllCategories } from '../models/categories.js';

/**
 * Service categories controller
 */

// Render the categories page
const showCategoriesPage = async (req, res, next) => {
    try {
        // Retrieve all service project categories from the database
        const categories = await getAllCategories();

        const title = 'Service Project Categories';

        // Render the EJS template with the categories data
        res.render('categories', { title, categories });

    } catch (error) {
        next(error);
    }
};

export { showCategoriesPage };
