export const paths = {
    front: {
        commonPoint: '/',
        user: {
            login: 'login',
            reset_password: 'reset_password',
            check_mail: 'check_mail',
            create_new_password: 'create_new_password',

            dashboard: 'dashboard',
            customer: 'customer',
            orders: 'orders',
            banner: 'banner',
            products: 'products',
            product_list: 'product_list',
            brands: 'brands',
            categories: 'categories',
            sub_categories: 'sub_categories',
            add_sub_categories: 'add_sub_categories',
            add_products: 'add_products',

            notification: 'notification',

            blogs: 'blogs',
            add_blogs: 'add_blogs',
            blog_list: 'blog_list',

            faq: 'faq',
            coupons: 'coupons',
            wallet: 'wallet',
            referrals: 'referrals',
            subscription_plan: 'subscription_plan',
            add_subscription_plan: 'add_subscription_plan',

            combo: 'combo',
            add_combo_category: 'add_combo_category',
            combo_sub_category_list: 'combo_sub_category_list',
            add_combo_sub_category: 'add_combo_sub_category',
            combo_product_list: 'combo_product_list',
            deals: 'deals',
            add_new_deal: 'add_new_deal',

            all_about_fitness: 'all_about_fitness',
            gym_guide: 'gym_guide',


            logout: 'logout'
        },

        login: 'login',
    }
}

const apisPathCommon = '/admin'
export const apisPath = {
    commonPoint: '/admin/',
    adminLogin: {
        login: `${apisPathCommon}/login`,
    },

    admin: {

        upload: `/upload`,
        users: `${apisPathCommon}/users`,
        banners: `${apisPathCommon}/banners`,
        brands: `${apisPathCommon}/brands`,
        categories: `${apisPathCommon}/categories`,
        subcategories: `${apisPathCommon}/subcategories`,
        blogs: `${apisPathCommon}/blogs`,
        faqs: `${apisPathCommon}/faqs`,
        coupons: `${apisPathCommon}/coupons`,
        plans: `${apisPathCommon}/plans`,

        comboCategories: `${apisPathCommon}/comboCategories`,
        comboSubCategories: `${apisPathCommon}/comboSubCategories`,
        comboProducts: `${apisPathCommon}/comboProducts`,

        orders: `${apisPathCommon}/orders`,
        orderAccept: "order/accept",
        orderReject: "order/cancel",
        orderInvoice: "invoiceCharges/",
        products: `${apisPathCommon}/products`,
        stockUpdate: `${apisPathCommon}/stock/update`,

        getReferrals: `${apisPathCommon}/getReferrals`,
        deals: `${apisPathCommon}/deals`,
        product_deals: `${apisPathCommon}/product/deals`,

        dashboard: `${apisPathCommon}/dashboard`,
        notification: `${apisPathCommon}/notification/schedule`,

        productAllData: "all/products",
        aboutFitness: 'about-fitness',
        gymGuide: 'gym-guide'
    }
}