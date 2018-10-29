using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AngularWebAPI.Model.Util
{
	public class ApiResponse<T>
	{
		private ApiResponse()
		{

		}

		public static ApiResponse<T> Create(T data, ResponseType responseType = ResponseType.Success, string message = null)
		{
			var apiResponse = new ApiResponse<T>();
			apiResponse.Data = data;
			apiResponse.ResponseType = responseType;
			apiResponse.Message = message;
			return apiResponse;
		}

		public ResponseType ResponseType { get; set; }
		public string Message { get; set; }
		public T Data { get; set; }
	}

	public enum ResponseType
	{
		Success = 0,
		Error = 1
	}
}
