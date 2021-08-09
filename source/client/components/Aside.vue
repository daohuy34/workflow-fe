<template>
    <div
        style="position: fixed; bottom: 0; left: 0; top: 0;"
        class="p-6 mr-5 w-60 bg-white"
    >
        <div class="flex space-2 items-center border-b-2 pb-4">
            <div class="items-center">
                <h1 class="text-3xl font-bold text-indigo-600">Workflow</h1>
                <p class="text-center text-sm text-indigo-600 mt-1 font-serif">
                    DASHBOARD
                </p>
            </div>
        </div>
        <div class="mt-8">
            <ul class="space-y-6">
                <li
                    class="hover:text-indigo-600"
                    v-for="(menu, key) in menus"
                    :key="key"
                >
                    <template v-if="menu.chils.length === 0">
                        <a
                            @click="redirect(menu)"
                            class="flex justify-between items-center  text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
                        >
                            <p
                                class="flex items-center mb-0 hover:text-indigo-600"
                            >
                                <fa
                                    class="h-6 w-6 mr-4 text-gray-400 transition duration-200"
                                    :icon="menu.icon"
                                />
                                <span>{{ menu.text }}</span>
                            </p>
                        </a>
                    </template>
                    <template v-else>
                        <a
                            @click="redirect(menu)"
                            class="flex justify-between items-center text-sm font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
                        >
                            <p class="flex items-center mb-0">
                                <fa
                                    class="h-6 w-6 mr-4 text-gray-400 hover:text-indigo-600 transition duration-200"
                                    :icon="menu.icon"
                                />
                                <span>{{ menu.text }}</span>
                            </p>
                            <fa
                                v-if="menu.chils.length > 0"
                                class="w-4 h-4"
                                :icon="
                                    menu.active > -1
                                        ? 'chevron-down'
                                        : 'chevron-up'
                                "
                            />
                        </a>
                        <template v-if="menu.active > -1">
                            <ul
                                class="p-2 pl-5 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-500 dark:text-gray-400 dark:bg-gray-900"
                                aria-label="submenu"
                            >
                                <li
                                    v-for="(chil, index) in menu.chils"
                                    :key="index"
                                    class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                                >
                                    <a
                                        @click="redirect(chil, true)"
                                        class="w-full cursor-pointer"
                                        >{{ chil.text }}</a
                                    >
                                </li>
                            </ul>
                        </template>
                    </template>
                </li>
            </ul>
        </div>
        <div class="flex space-x-4 items-center fixed bottom-6">
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 text-gray-400 hover:text-indigo-600 transition duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                </svg>
            </div>
            <a
                @click="logout"
                class="block font-semibold text-gray-500 hover:text-indigo-600 transition duration-200"
                >Đăng xuất</a
            >
        </div>
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
                    name: 'dashboard',
                    active: 1,
                    chils: []
                },
                {
                    id: '2',
                    icon: 'archive',
                    text: 'Thương mại',
                    active: -1,
                    chils: [
                        {
                            text: 'Danh mục',
                            name: 'collection'
                        },
                        {
                            text: 'Quà',
                            name: 'gift'
                        },
                        {
                            text: 'Sản phẩm',
                            name: 'product'
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
        redirect(item, isChil = false) {
            if (!isChil) {
                this.menus.map(e => {
                    if (e.id === item.id) {
                        return (e.active = -e.active)
                    } else {
                        return (e.active = -1)
                    }
                })
            }
            if (item.name) {
                this.$store.dispatch('breadcrumbs/add', item)
                this.$router.push({ name: item.name })
            }
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
