import Vue from 'vue';
declare class Page extends Vue {
    $refs: any;
    pageName: string;
    permissions: any;
    ready(): void;
    created(): void;
    mounted(): void;
}
export default Page;
