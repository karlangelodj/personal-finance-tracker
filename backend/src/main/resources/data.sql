INSERT INTO quest_templates (name, description, quest_type, category, suggested_target, suggested_period, hp_reward, hp_penalty, is_seasonal, season_month)
SELECT 'No Food Delivery Weekend', 'Resist the urge to order delivery this week', 'NO_SPEND', 'Food Delivery', NULL, 'WEEKLY', 10, 10, 0, NULL
WHERE NOT EXISTS (SELECT 1 FROM quest_templates WHERE name = 'No Food Delivery Weekend');

INSERT INTO quest_templates (name, description, quest_type, category, suggested_target, suggested_period, hp_reward, hp_penalty, is_seasonal, season_month)
SELECT 'Grocery Budget Guardian', 'Keep grocery spending under control this month', 'SPENDING_LIMIT', 'Groceries', 5000, 'MONTHLY', 15, 15, 0, NULL
WHERE NOT EXISTS (SELECT 1 FROM quest_templates WHERE name = 'Grocery Budget Guardian');

INSERT INTO quest_templates (name, description, quest_type, category, suggested_target, suggested_period, hp_reward, hp_penalty, is_seasonal, season_month)
SELECT 'No Online Shopping Week', 'Close those browser tabs — no online shopping this week', 'NO_SPEND', 'Online Shopping', NULL, 'WEEKLY', 10, 10, 0, NULL
WHERE NOT EXISTS (SELECT 1 FROM quest_templates WHERE name = 'No Online Shopping Week');

INSERT INTO quest_templates (name, description, quest_type, category, suggested_target, suggested_period, hp_reward, hp_penalty, is_seasonal, season_month)
SELECT 'Coffee Shop Cutback', 'Limit coffee shop spending this month', 'SPENDING_LIMIT', 'Coffee', 1500, 'MONTHLY', 10, 10, 0, NULL
WHERE NOT EXISTS (SELECT 1 FROM quest_templates WHERE name = 'Coffee Shop Cutback');

INSERT INTO quest_templates (name, description, quest_type, category, suggested_target, suggested_period, hp_reward, hp_penalty, is_seasonal, season_month)
SELECT 'Monthly Savings Sprint', 'Save more than you spend this month', 'SAVINGS_TARGET', NULL, 10000, 'MONTHLY', 20, 15, 0, NULL
WHERE NOT EXISTS (SELECT 1 FROM quest_templates WHERE name = 'Monthly Savings Sprint');

INSERT INTO quest_templates (name, description, quest_type, category, suggested_target, suggested_period, hp_reward, hp_penalty, is_seasonal, season_month)
SELECT 'No Entertainment Spending', 'Skip the entertainment expenses this week', 'NO_SPEND', 'Entertainment', NULL, 'WEEKLY', 10, 10, 0, NULL
WHERE NOT EXISTS (SELECT 1 FROM quest_templates WHERE name = 'No Entertainment Spending');

INSERT INTO quest_templates (name, description, quest_type, category, suggested_target, suggested_period, hp_reward, hp_penalty, is_seasonal, season_month)
SELECT 'Dining Out Control', 'Keep dining out spending in check this month', 'SPENDING_LIMIT', 'Dining Out', 3000, 'MONTHLY', 15, 10, 0, NULL
WHERE NOT EXISTS (SELECT 1 FROM quest_templates WHERE name = 'Dining Out Control');

INSERT INTO quest_templates (name, description, quest_type, category, suggested_target, suggested_period, hp_reward, hp_penalty, is_seasonal, season_month)
SELECT 'December Holiday Gauntlet', 'Control holiday spending in December', 'SPENDING_LIMIT', 'Shopping', 10000, 'MONTHLY', 25, 20, 1, 12
WHERE NOT EXISTS (SELECT 1 FROM quest_templates WHERE name = 'December Holiday Gauntlet');

INSERT INTO quest_templates (name, description, quest_type, category, suggested_target, suggested_period, hp_reward, hp_penalty, is_seasonal, season_month)
SELECT 'New Year Savings Kickoff', 'Start the year strong with a savings target', 'SAVINGS_TARGET', NULL, 15000, 'MONTHLY', 25, 15, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM quest_templates WHERE name = 'New Year Savings Kickoff');

-- Expense Categories
INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Food & Dining', 'EXPENSE', '🍽️', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Food & Dining');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Groceries', 'EXPENSE', '🛒', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Groceries');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Transportation', 'EXPENSE', '🚗', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Transportation');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Bills & Utilities', 'EXPENSE', '💡', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Bills & Utilities');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Shopping', 'EXPENSE', '🛍️', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Shopping');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Entertainment', 'EXPENSE', '🎮', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Entertainment');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Health & Medical', 'EXPENSE', '❤️', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Health & Medical');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Education', 'EXPENSE', '📚', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Education');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Travel', 'EXPENSE', '✈️', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Travel');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Savings', 'EXPENSE', '🏦', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Savings');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Pets', 'EXPENSE', '🐾', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Pets');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Personal Care', 'EXPENSE', '💆', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Personal Care');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Other Expense', 'EXPENSE', '📦', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Other Expense');

-- Income Categories
INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Salary', 'INCOME', '💼', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Salary');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Bonus', 'INCOME', '🎁', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Bonus');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Freelance', 'INCOME', '💻', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Freelance');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Business', 'INCOME', '🏢', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Business');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Investment Returns', 'INCOME', '📈', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Investment Returns');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Gift', 'INCOME', '🎀', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Gift');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Refund', 'INCOME', '🔄', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Refund');

INSERT INTO categories (name, type, icon, is_default, created_at)
SELECT 'Other Income', 'INCOME', '📦', 1, CURRENT_TIMESTAMP
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Other Income');