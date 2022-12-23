import { Types } from "mongoose"
import fs from 'fs'

interface IFamilyFields {
    _id: Types.ObjectId | string
    family: string,
    total: number,
    qrcode: string
}

export function csvGenerator (families: Array<IFamilyFields>) {
    const path = 'uploads/familiesList.csv'
    fs.writeFileSync(path , '', 'utf-8')
    const _families = JSON.parse(JSON.stringify(families))
    const fields = _families.map((family:IFamilyFields)=>{
        return{
            ...family,
            _id: family._id.toString()
        }
    })
    const content = [['name', 'code', '@qrcode']]
    fields.forEach((family: IFamilyFields) => {
        content.push([family.family, family._id as string, `/Users/jhoansebastianburbano/Documents/freelance/design/datamerge/${family._id}.png`])
    });

    content.forEach(row => fs.appendFileSync(path, row.join(',')+'\n'))
    const url = fs.readFileSync(path, {encoding: 'base64'})
    return {message: 'csv has been generated', url} 
}