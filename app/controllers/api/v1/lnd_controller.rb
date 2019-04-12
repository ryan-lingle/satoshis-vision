class Api::V1::LndController < ApplicationController
  protect_from_forgery with: :null_session

  def invoice
    edits = JSON.parse(params[:edits])

    value = edits.size * 100


    invoice = LnService.add_invoice({
      memo: "Editing the Vision",
      value: value,
      expiry: 300
    })

    InvoiceSubscriber.new.async.subscribe(
      payment_request: invoice.payment_request,
      edits: edits
    )
    render json: { 'invoice': invoice.payment_request }.as_json
  end
end
