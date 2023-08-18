import { useRouter, useRoute } from 'vue-router';

export default function useCommon() {
  const route = useRoute();
  interface Query {
    [propName: string]: any;
  }
  const router = useRouter();

  const push = (name: any, query?: Query) => {
    router.push({ name, query }).then();
  };
  const replace = (name: any, query?: Query) => {
    router.replace({ name, query }).then();
  };
  const back = () => {
    router.back();
  };
  return {
    route,
    router,
    push,
    replace,
    back,
  };
}
