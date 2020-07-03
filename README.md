# ecomm-orders

Sample data to create and update order

```json
{
	"products":[{
		"product_id":"5efb4b2f87150e186cee8c08",
		"varient_id":"5efb4b2f87150e186cee8c08",
		"quantity":2,
		"sku":"abcdekfdl",
		"price_inc_tax":40.0,
		"price_ex_tax":38
	}],
	"currency":"INR",
	"status":"pending",
	"subtotal":80.0,
	"subtotal_tax":8,
	"discount_total":0,
	"discount_tax":0,
	"shipping_total":0,
	"shipping_tax":0,
	"user":"5eece8b8a593df0a58c09982",
	"billing_address":{
		"first_name":"Mayur",
		"last_name":"Singal",
		"address_line_1":"MG Road",
		"address_line_2":"Borivali",
		"state":"Maharashtra",
		"city":"Mumbai",
		"country":"India",
		"zip":400066,
		"phone":1234567890
	},
	"shipping_address":{
		"first_name":"Mayur",
		"last_name":"Singal",
		"address_line_1":"MG Road",
		"address_line_2":"Borivali",
		"state":"Maharashtra",
		"city":"Mumbai",
		"country":"India",
		"zip":400066,
		"phone":1234567890
	},
	"payment_method":"123",
	"payment_method_title":"COD",
	"transaction_id":"23456789",
	"date_paid":"2020-07-02",
	"date_completed":"2020-07-10",
	"cart_hash":"",
	"refunds":[],
	"set_paid":true,
	"tag":"mystore",
	"send_recipts":true
}
```
