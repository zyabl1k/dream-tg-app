import { $api } from '@/shared/api/axios-build.api.ts'
import { DreamResponse } from '@/@types/dream'

export const getDreamData = async () => {
  const response = await $api.get('dream/list')
  return response.data as DreamResponse[]
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
