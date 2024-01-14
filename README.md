# Custom phone input for using with Ant design form

## Libraries

- [react-international-phone](https://react-international-phone.vercel.app/)
- [google-libphonenumber](https://github.com/ruimarinho/google-libphonenumber) ( need to go with @types/google-libphonenumber)
- antd design and tailwind css

## Way to do

- Make a custom Form.Item component. We just use it, and give props like a normal Form.Items.
- Using Space.Compact (antd) to  compact a tel input field and  a country selector from react-international-phone
- Using google-libphonenumber  for validation and transform to E164 format

```jsx
import { Button, Form } from 'antd'
import { useForm } from 'antd/es/form/Form'
import './App.css'
import { PhoneInputField } from './phone-input'
import { transformToE164format } from './phone-input/util'

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
      />
      <Button type='primary' htmlType='submit'>
        Submit
      </Button>
    </Form>
  )
}

export default App
```
