import axios from 'axios'
import xml2js from 'xml2js'

export async function fetchReferenceRate(): Promise<number> {
    try {
        const response = await axios.get(
            'https://static.nbp.pl/dane/stopy/stopy_procentowe.xml'
        )

        const data = await xml2js.parseStringPromise(response.data)

        const referenceRateString: string =
            data.stopy_procentowe.tabela[0].pozycja[0].$.oprocentowanie

        const referenceRate: number = Number(
            referenceRateString.replace(',', '.')
        )

        return referenceRate
    } catch (error) {
        console.error('Error fetching reference rate:', error)
        throw error
    }
}
