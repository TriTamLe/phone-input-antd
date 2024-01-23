import { Button, Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import './App.css'
import { PhoneInputField, transformToE164format } from './phone-input'

function App() {
  const [form] = useForm()

  return (
    <Form
      form={form}
      onFinish={() => {
        const formData = form.getFieldsValue(true)
        console.log('raw:', formData)
        console.log(
          'transformed',
          transformToE164format(
            formData.phone.number,
            formData.phone['country-code']
          )
        )
      }}>
      <PhoneInputField
        name='phone'
        countryFieldName='country-code'
        phoneFieldName='number'
        required
        hideCountryName
      />
      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default App
