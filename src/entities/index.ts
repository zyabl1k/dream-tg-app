import { $api } from '@/shared/api/axios-build.api.ts'
import { DreamResponse, DreamResponse2 } from '@/@types/dream'
import { useTelegram } from '@/shared/lib/telegram.provider.tsx'

export const getDreamData = async (userId: number) => {
  const response = await $api.get(`dream/list?telegram_user_id=${userId}`)
  return response.data as DreamResponse[]
}

export const getDream = async (userId: number, id: string) => {
  const response = await $api.get(`dream/${id}?telegram_user_id=${userId}`)
  return response.data as DreamResponse2
}

export const sendDream = async (desc: string, life: string) => {
  const { user } = useTelegram()
  const response = await $api.post(`dream/send`, {
    telegram_user_id: user?.id || 1347606553,
    dreamDescription: desc,
    lifeDescription: life,
  })
  return response.data as { id: number }
}

// const DataComponent = () => {
//     const { data, error, isLoading } = useQuery(['posts'], fetchData);
//
//     if (isLoading) return <div>Loading...</div>;
//     if (error) return <div>Error: {error.message}</div>;
//
//     return (
//         <ul>
//             {data.map((post) => (
//                     <li key={post.id}>{post.title}</li>
//                 ))}
//         </ul>
//     );
// };
//
// export default DataComponent;

// Пример отправки данных:

// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import axios from 'axios';
//
// const postData = async (newPost) => {
//     const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
//     return response.data;
// };
//
// const PostComponent = () => {
//     const queryClient = useQueryClient();
//
//     const mutation = useMutation(postData, {
//         onSuccess: () => {
//             // Обновление кэша после успешной отправки
//             queryClient.invalidateQueries(['posts']);
//         },
//     });
//
//     const handleAddPost = () => {
//         mutation.mutate({ title: 'New Post', body: 'This is the content of the new post' });
//     };
//
//     return (
//         <div>
//             <button onClick={handleAddPost} disabled={mutation.isLoading}>
//         {mutation.isLoading ? 'Adding...' : 'Add Post'}
//         </button>
//     {mutation.isError && <div>Error: {mutation.error.message}</div>}
//         {mutation.isSuccess && <div>Post added successfully!</div>}
//         </div>
//         );
//         };
//
//         export default PostComponent;
