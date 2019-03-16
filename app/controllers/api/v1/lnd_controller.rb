class Api::V1::LndController < ApplicationController
  def invoice
    invoice = LnService.add_invoice(
      memo: "Publish Edit @ toshi.vision",
      value: JSON.parse(params[:edits]).size * 100,
      expiry: 300
    )
    InvoicesWorker.perform_async(
      payment_request: invoice.payment_request,
      edits: JSON.parse(params[:edits])
    )
    render json: Oj.dump(invoice.payment_request)
  end
end
