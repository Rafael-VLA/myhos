import axios from 'axios'

export const submitQuestionAI = async <TParams, TData>(url: string, { arg }: { arg: TParams }): Promise<TData> => {
    const { fields } = arg as { fields: object }
    const { data } = await axios.post<TData>(url, fields)
    return data;
}