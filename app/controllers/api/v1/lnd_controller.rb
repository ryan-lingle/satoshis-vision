class Api::V1::LndController < ApplicationController
  protect_from_forgery with: :null_session
  def invoice
    edits = JSON.parse(params[:edits])
    invoice = LnService.add_invoice(
      memo: "Publish Edit @ toshi.vision",
      value: edits.size * 100,
      expiry: 300
    )
    InvoicesWorker.perform_async(
      payment_request: invoice.payment_request,
      edits: edits
    )
    render json: { 'invoice': invoice.payment_request }.as_json
  end
end
