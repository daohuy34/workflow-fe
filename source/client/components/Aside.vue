<template>
    <div>
        <aside
            class="z-20 hidden w-56 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0 shadow-md h-full"
        >
            <div class="py-4 text-gray-500 dark:text-gray-400">
                <a
                    class="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
                    href="#"
                >
                    Workflow
                </a>
                <ul class="mt-6">
                    <li
                        v-for="(menu, key) in menus"
                        :key="key"
                        class="relative px-6 py-3"
                    >
                        <template v-if="menu.chils.length > 0">
                            <span
                                v-if="menu.active > -1"
                                class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"
                            ></span>
                            <button
                                class="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                @click="redirect(menu)"
                                aria-haspopup="true"
                            >
                                <span class="inline-flex items-center">
                                    <fa class="w-5 h-5" :icon="menu.icon" />
                                    <span class="ml-4">{{ menu.text }}</span>
                                </span>
                                <fa class="w-4 h-4" icon="chevron-down" />
                            </button>
                            <template v-if="menu.active > -1">
                                <ul
                                    class="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
                                    aria-label="submenu"
                                >
                                    <li
                                        v-for="(chil, index) in menu.chils"
                                        :key="index"
                                        class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        <a class="w-full">{{ chil.text }}</a>
                                    </li>
                                </ul>
                            </template>
                        </template>
                        <template v-else>
                            <span
                                v-if="menu.active > -1"
                                class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                                aria-hidden="true"
                            ></span>
                            <a
                                class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
                                href="#"
                                @click="redirect(menu)"
                            >
                                <fa class="w-5 h-5" :icon="menu.icon" />
                                <span class="ml-4">{{ menu.text }}</span>
                            </a>
                        </template>
                    </li>
                </ul>
                <div class="px-6 my-6">
                    <button
                        @click="logout"
                        class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isPagesMenuOpen: false,
            menus: [
                {
                    id: '1',
                    icon: 'home',
                    text: 'Trang chủ',
                    slug: 'home',
                    active: 1,
                    chils: []
                },
                {
                    id: '2',
                    icon: 'archive',
                    text: 'Sản phẩm',
                    slug: '',
                    active: -1,
                    chils: [
                        {
                            text: 'Danh mục'
                        },
                        {
                            text: 'Quà'
                        },
                        {
                            text: 'Sản phẩm'
                        }
                    ]
                },
                {
                    id: '3',
                    icon: 'shopping-cart',
                    text: 'Đơn hàng',
                    slug: '',
                    active: -1,
                    chils: [
                        {
                            text: 'Đơn quà'
                        },
                        {
                            text: 'Đơn sản phẩm'
                        }
                    ]
                },
                {
                    id: '4',
                    icon: 'user-friends',
                    text: 'Phòng ban',
                    slug: '',
                    active: -1,
                    chils: []
                },
                {
                    id: '6',
                    icon: 'project-diagram',
                    text: 'Dự án',
                    slug: '',
                    active: -1,
                    chils: [
                        {
                            text: 'Login'
                        },
                        {
                            text: 'Login'
                        },
                        {
                            text: 'Login'
                        }
                    ]
                },
                {
                    id: '7',
                    icon: 'bookmark',
                    text: 'Tổng hợp',
                    slug: '',
                    active: -1,
                    chils: [
                        {
                            text: 'Thành viên'
                        },
                        {
                            text: 'Phân quyền'
                        },
                        {
                            text: 'Báo cáo'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        redirect(item) {
            this.menus.map(e => {
                if (e.id === item.id) {
                    return (e.active = 1)
                } else {
                    return (e.active = -1)
                }
            })
        },
        async logout() {
            try {
                await this.$fire.auth.signOut()
            } catch (e) {
                alert(e)
            }
        }
    }
}
</script>
