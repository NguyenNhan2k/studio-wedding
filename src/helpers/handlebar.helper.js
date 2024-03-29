const Handlebars = require('Handlebars');
const handlebar = {
    convertToDate: (date) => {
        const result = new Date(date);
        return result.toLocaleString();
    },
    sortable: (field, sort, page) => {
        const isType = ['asc', 'desc'];
        const sortType = field === sort.column && isType.includes(sort.type) ? sort.type : 'default';
        const icons = {
            default: 'fa-solid fa-sort sort',
            asc: 'fa-solid fa-arrow-down-wide-short',
            desc: `fa-solid fa-arrow-up-wide-short`,
        };
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc',
        };
        const icon = icons[sortType];
        const type = types[sortType];
        const href = Handlebars.escapeExpression(`?_sort&column=${field}&type=${type}&page=${page.index}`);
        const output = `
            <a href="${href}"><i class="${icon} text-secondary"></i> </a>`;
        return new Handlebars.SafeString(output);
    },
    toString: (payload) => {
        console.log(payload);
    },
    displaySelected: (arrValue, compareValue) => {
        if (!Array.isArray(arrValue) && arrValue.length < 0) {
            return '';
        }
        const options = arrValue.map((option) => {
            const output = `<option value="${option.id}" ${option.value == compareValue ? 'selected' : ''}>${option.value} </option>`;
            return output;
        });
        return new Handlebars.SafeString(options);
    },
    convertToVND: (payload) => {
        const config = { style: 'currency', currency: 'VND' };
        const formated = new Intl.NumberFormat('vi-VN', config).format(payload);
        return formated;
    },
    isCompare: (value, isValue, trueOutput, falseOuput) => {
        return value == isValue ? trueOutput : falseOuput;
    },
    increment: (index, value) => {
        return index + value;
    },
    sliderImages: (images) => {
        if (!Array.isArray(images) && images.length < 0) {
            return '';
        }
        const options = images.map((img, index) => {
            const output = `    <div class='carousel-item ${index === 0 && 'active'}'>
                <img src='/images/weddings/${img.name}' class='d-block w-100 h-100' alt='...' />
            </div>`;
            return output;
        });
        return new Handlebars.SafeString(options);
    },
    converthandle: (payload) => {
        console.log(payload);
        return new Handlebars.SafeString(payload);
    },
    paging: (page, countPage) => {
        const indexPage = [];
        for (let i = 1; i < countPage + 1; i++) {
            indexPage.push(
                `
                <li class="page-item ${page.index == i ? 'active' : ''}" aria-current="page">
                <a class="page-link " href='?page=${i}'>${i}</a>
                </li>
                `,
            );
        }
        const prePage = page.index == 1 ? page.index : +page.index - 1;
        const nextPage = page.index == countPage ? 1 : +page.index + 1;
        const newOutput = `


        <ul class="pagination float-end">
            <li class="page-item ${page.index == 1 ? 'disabled' : ''}">
                <a class="page-link" href='?page=${prePage}' tabindex="-1" aria-disabled="true">Previous</a>
            </li>
            ${indexPage.join('')}
            <li class="page-item ${page.index == countPage ? 'disabled' : ''}">
                <a class="page-link" href='?page=${nextPage}'>Next</a>
            </li>
        </ul>
        `;
        return new Handlebars.SafeString(newOutput);
        // const output = index + 1 === page.pageIndex ? 'paging_ground' + page.select : 'paging_ground';
    },
};
module.exports = handlebar;
